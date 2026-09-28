/* Run: node scripts/verify-community.cjs. No live emails or credentials are used. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

function harness({ configured = true, deliveryError = false, limited = false } = {}) {
  const cache = new Map();
  const sent = [];
  const env = configured ? { RESEND_API_KEY: "test-placeholder" } : {};
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    function localRequire(name) {
      if (name === "resend") return { Resend: class {
        emails = { send: async (payload, options) => {
          sent.push({ payload, options });
          return { error: deliveryError ? { message: "Fake provider error" } : null };
        } };
      } };
      if (name === "next/server") return { NextResponse: Response };
      if (name.startsWith("@/")) {
        const result = load(path.join(root, "src", name.slice(2) + ".ts"));
        return limited && name === "@/lib/api-safety" ? { ...result, rateLimit: () => false } : result;
      }
      return require(name);
    }
    const context = vm.createContext({ module, exports: module.exports, require: localRequire, process: { env }, Buffer, Request, Response, URL, console });
    new vm.Script(source, { filename }).runInContext(context);
    return module.exports;
  }
  return { route: load(path.join(root, "src/app/api/community/route.ts")), sent };
}

const valid = { fullName: "Preview <Test>", email: "preview@example.com", company: "Example & Co", industry: "B2B SaaS", website: "example.com", companyFax: "" };
function request(data = valid, origin = "http://localhost:3020") {
  return new Request("http://localhost:3020/api/community", {
    method: "POST", headers: { "content-type": "application/json", origin },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
}

(async () => {
  const success = harness();
  assert.equal((await success.route.POST(request())).status, 200);
  assert.equal(success.sent[0].payload.to, "work@cnvrted.com");
  assert.equal(success.sent[0].payload.replyTo, "preview@example.com");
  assert.match(success.sent[0].payload.html, /Preview &lt;Test&gt;/);
  assert.match(success.sent[0].payload.html, /Example &amp; Co/);
  assert.match(success.sent[0].payload.text, /https:\/\/example.com\//);
  await success.route.POST(request());
  assert.equal(success.sent[0].options.idempotencyKey, success.sent[1].options.idempotencyKey);

  for (const data of ["{", "null", "[]", {}, { ...valid, fullName: "" }, { ...valid, email: "bad" }, { ...valid, website: "javascript:alert(1)" }, { ...valid, website: "https://user:password@example.com" }, { ...valid, company: "x".repeat(121) }, { ...valid, companyFax: "bot" }]) {
    const test = harness();
    assert.equal((await test.route.POST(request(data))).status, 400);
    assert.equal(test.sent.length, 0);
  }
  assert.equal((await harness().route.POST(request({ ...valid, website: "" }))).status, 200);
  assert.equal((await harness().route.POST(request(valid, "https://other.example"))).status, 403);
  const proxied = new Request("http://localhost:3020/api/community", {
    method: "POST", headers: { "content-type": "application/json", origin: "https://cnvrted.com", host: "cnvrted.com", "x-forwarded-proto": "https" }, body: JSON.stringify(valid),
  });
  assert.equal((await harness().route.POST(proxied)).status, 200);
  const crossOrigin = new Request("http://localhost:3020/api/community", {
    method: "POST", headers: { "content-type": "application/json", origin: "https://other.example", host: "cnvrted.com", "x-forwarded-proto": "https" }, body: JSON.stringify(valid),
  });
  assert.equal((await harness().route.POST(crossOrigin)).status, 403);
  assert.equal((await harness().route.POST(request("x".repeat(8193)))).status, 413);
  assert.equal((await harness({ configured: false }).route.POST(request())).status, 503);
  assert.equal((await harness({ deliveryError: true }).route.POST(request())).status, 502);
  assert.equal((await harness({ limited: true }).route.POST(request())).status, 429);
  console.log("PASS: community validation, optional website, escaped email, fixed recipient, retry idempotency, origin/body limits, and failure states. No email sent.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
