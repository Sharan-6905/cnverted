import assert from 'node:assert/strict';
const base = process.env.SEO_BASE_URL || 'http://localhost:3131';
const site = 'https://www.cnvrted.com';
async function page(path, status = 200) {
 const r = await fetch(base + path); assert.equal(r.status, status, path); return r.text();
}
const schemas = html => [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
for (const [slug, name] of [['dhruv-pradeep','Dhruv Pradeep'], ['kailas-krsna','Kailas Krsna']]) {
 const path = '/team/'+slug, html = await page(path);
 assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length,1);
 assert.ok(html.includes(`rel="canonical" href="${site}${path}"`));
 assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html));
 const profile=schemas(html).find(s=>s['@type']==='ProfilePage');
 assert.equal(profile.mainEntity.name,name); assert.equal(profile.mainEntity['@id'],site+path+'#person');
 assert.equal(profile.mainEntity.sameAs.length,2);
 for(const href of ['/team','/about',...profile.mainEntity.sameAs]) assert.ok(html.includes(`href="${href}"`),href);
 console.log('PASS profile', path);
}
await page('/team'); await page('/team/unknown-founder',404);
for (const path of ['/about','/contact']) {
 const html=await page(path); for(const slug of ['dhruv-pradeep','kailas-krsna']) assert.ok(html.includes(`href="/team/${slug}"`));
}
for(const slug of ['apollo-vs-cnvrted','what-is-a-gtm-play']) {
 const html=await page('/blogs/'+slug);
 assert.ok(html.includes('href="/team/dhruv-pradeep"'));
 const article=schemas(html).find(s=>s['@type']==='BlogPosting'||s['@type']==='Article');
 assert.equal(article.author['@id'],site+'/team/dhruv-pradeep#person');
}
const sitemap=await page('/sitemap.xml');
for(const path of ['/team','/team/dhruv-pradeep','/team/kailas-krsna']) assert.ok(sitemap.includes(`<loc>${site}${path}</loc>`));
const product=await page('/product');
for(const path of ['leads','communities']) assert.ok(product.includes(`href="https://beta.cnvrted.com/${path}"`));
const learn=await page('/learn');
for(const path of ['/blogs/hiring-signals-for-sales','/blogs/qualify-prospects-before-cold-email','/learn/ideal-customer-profile']) { assert.ok(learn.includes(`href="${path}"`)); await page(path); }
console.log('PASS directory, missing-profile 404, team cards, article identity, sitemap and discovery links');
