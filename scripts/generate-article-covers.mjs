// Original editorial diagrams. Run from the repository root with Node.
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const directory = new URL("../public/articles/", import.meta.url);
await mkdir(directory, { recursive: true });
const ink = "#27312b";
const olive = "#697b31";
const purple = "#8473bd";
const esc = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const text = (x, y, value, size = 24, color = ink, serif = false) => `<text x="${x}" y="${y}" fill="${color}" font-family="${serif ? "Georgia,serif" : "Arial,sans-serif"}" font-size="${size}">${esc(value)}</text>`;
const card = (x, y, w, h, fill = "#fff") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${fill}" stroke="#deded2"/>`;
const arrow = (x, y, length = 45) => `<path d="M${x} ${y}h${length}m-9 -7 9 7-9 7" fill="none" stroke="${olive}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle = (x, y, label, fill = "#eef1dd") => `<circle cx="${x}" cy="${y}" r="31" fill="${fill}"/>${text(x - 8, y + 9, label, 26, olive)}`;
const frame = (number, title, diagram) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="512" viewBox="0 0 1200 512"><rect width="1200" height="512" fill="#f7f5ed"/><path d="M910 0 1200 210V0Z" fill="#eeeadf"/><path d="M0 375 210 512H0Z" fill="#e9eddc"/>${text(50, 48, `CNVRTED  /  FIELD NOTES ${number}`, 16, olive)}${text(50, 110, title, 42, ink, true)}${diagram}${text(50, 479, "A practical guide to signal-led prospecting", 17, "#65695c")}</svg>`;

const covers = [
  ["first-customers", frame("01", "Start with a reason to talk.",
    ["Observe", "Confirm", "Pilot"].map((label, i) => {
      const x = 50 + i * 385;
      return card(x, 165, 330, 245, ["#fff", "#f1edf9", "#eaf0df"][i]) + circle(x + 47, 215, String(i + 1)) + text(x + 26, 290, label, 34, ink, true) + text(x + 26, 338, ["A relevant event", "A real problem", "A bounded first step"][i], 23) + (i < 2 ? arrow(x + 342, 285, 30) : "");
    }).join(""))],
  ["hiring-signals", frame("02", "Read the work behind the role.",
    card(50, 158, 420, 260) + text(80, 205, "JOB OPENING", 17, olive) + text(80, 251, "A role is a clue.", 31, ink, true) + [0, 1, 2].map(i => `<rect x="80" y="${281 + i * 33}" width="${320 - i * 42}" height="10" rx="5" fill="${i === 1 ? "#c5b7e6" : "#e5e8db"}"/>`).join("") + arrow(490, 288, 72) + ["What work?", "Why now?", "Where is the gap?"].map((label, i) => card(590, 160 + i * 89, 560, 70, i === 2 ? "#eaf0df" : "#fff") + text(618, 205 + i * 89, label, 26)).join(""))],
  ["prospect-qualification", frame("03", "Evidence before outreach.",
    ["Fit", "Evidence", "Timing", "Next step"].map((label, i) => {
      const x = 50 + i * 283;
      return card(x, 180, 250, 205, i === 3 ? "#eaf0df" : "#fff") + circle(x + 125, 245, String(i + 1), i === 1 ? "#e9e0f6" : "#eef1dd") + text(x + 27, 338, label, 30, ink, true) + (i < 3 ? arrow(x + 257, 282, 20) : "");
    }).join(""))],
  ["agency-outbound", frame("04", "One service. A specific reason.",
    card(50, 166, 505, 245, "#f1edf9") + text(80, 207, "THE SIGNAL", 17, purple) + text(80, 264, "A launch", 34, ink, true) + text(80, 306, "with an unresolved gap", 26) + text(80, 371, "Check the source. Confirm the need.", 20) + arrow(566, 288, 62) + card(650, 166, 500, 245, "#eaf0df") + text(680, 207, "THE OFFER", 17, olive) + text(680, 264, "A focused sprint", 34, ink, true) + text(680, 306, "with a clear finish line", 26) + text(680, 371, "Define the work. Agree the next step.", 20))],
  ["outreach-metrics", frame("05", "Count the conversations that matter.",
    [["80", "Reached"], ["12", "Positive replies"], ["8", "Booked"], ["5", "Qualified / held"]].map(([value, label], i) => {
      const x = 50 + i * 283;
      return card(x, 170, 250, 219, i === 3 ? "#eaf0df" : "#fff") + text(x + 26, 253, value, 64, i === 3 ? olive : ink, true) + text(x + 26, 306, label, 23) + `<rect x="${x + 26}" y="345" width="${194 - i * 44}" height="9" rx="4" fill="${i === 3 ? olive : "#b7a9d6"}"/>`;
    }).join("") + text(50, 427, "Illustrative account funnel · not a benchmark", 17, "#65695c"))]
];

for (const [name, svg] of covers) {
  await writeFile(new URL(`${name}.svg`, directory), svg);
  await sharp(Buffer.from(svg)).png({ palette: true, quality: 100 }).toFile(new URL(`${name}.png`, directory).pathname);
}
console.log(`Created ${covers.length} original article covers.`);
