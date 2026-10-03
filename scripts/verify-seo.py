"""Audit rendered SEO output: python3 scripts/verify-seo.py http://localhost:3020"""
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3020").rstrip("/")
CANONICAL = "https://www.cnvrted.com"


def fetch(path, agent="Mozilla/5.0 SEO verification"):
    request = urllib.request.Request(BASE + path, headers={"User-Agent": agent})
    try:
        response = urllib.request.urlopen(request, timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    return response.status, response.read().decode()


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.meta, self.links, self.jsonld = {}, [], []
        self.title, self.canonical, self.h1_count = "", None, 0
        self.in_title, self.in_json, self.buffer = False, False, ""
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "a":
            self.links.append(attrs.get("href"))
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.in_title = True
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_json, self.buffer = True, ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_json:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.in_json:
            self.jsonld.append(json.loads(self.buffer))
            self.in_json = False


status, xml = fetch("/sitemap.xml")
assert status == 200, "Sitemap unavailable"
entries = ET.fromstring(xml)
urls = [entry.find("{*}loc").text for entry in entries]
assert len(urls) == len(set(urls)), "Duplicate sitemap URLs"
assert all(url.startswith(CANONICAL) for url in urls), "Non-canonical sitemap host"
paths = [urllib.parse.urlparse(url).path or "/" for url in urls]
assert "/404" not in paths and "/og-preview" not in paths


def audit(path):
    status, html = fetch(path)
    assert status == 200, (path, status)
    page = Page(html)
    expected = CANONICAL + path
    assert page.canonical and page.canonical.rstrip("/") == expected.rstrip("/"), (path, "canonical", page.canonical)
    assert page.title and page.meta.get("description"), (path, "missing title/description")
    assert page.h1_count == 1, (path, "heading count", page.h1_count)
    assert "noindex" not in page.meta.get("robots", ""), (path, "noindex")
    assert page.meta.get("og:url", "").rstrip("/") == expected.rstrip("/"), (path, "wrong social URL")
    assert page.meta.get("og:title") and page.meta.get("twitter:title"), (path, "missing social title")
    assert page.meta.get("og:image", "").startswith(CANONICAL), (path, "missing social image")
    assert page.meta.get("twitter:image", "").startswith(CANONICAL), (path, "missing X image")
    assert page.jsonld, (path, "missing structured data")
    types = [node.get("@type") for node in page.jsonld]
    if path.startswith(("/blogs/", "/case-studies/")):
        assert "Article" in types or "BlogPosting" in types, (path, "missing article")
        assert "BreadcrumbList" in types, (path, "missing breadcrumb")
    if path in ("/", "/pricing"):
        assert "SoftwareApplication" in types
    else:
        assert "SoftwareApplication" not in types, (path, "irrelevant product offers")
    if path == "/":
        for destination in ("/pricing", "/about", "/customers", "/case-studies", "/blogs", "/contact"):
            assert destination in page.links, (path, "missing crawlable link", destination)
        assert "FAQPage" in types
    if path == "/help-center":
        assert "FAQPage" in types
        assert "Which AI models does Cnvrted work with?" in html, "Paginated help missing from HTML"
    return {"path": path, "title": page.title, "status": status}


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    rows = list(pool.map(audit, paths))
assert len({row["title"] for row in rows}) == len(rows), "Duplicate page titles"
status, robots = fetch("/robots.txt")
assert status == 200
parser = urllib.robotparser.RobotFileParser()
parser.parse(robots.splitlines())
for agent in ("Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User"):
    assert all(parser.can_fetch(agent, CANONICAL + path) for path in paths), agent
for path in ("/404", "/blogs/seo-audit-missing", "/case-studies/seo-audit-missing", "/careers/seo-audit-missing"):
    status, html = fetch(path)
    page = Page(html)
    assert status == 404 and "noindex" in page.meta.get("robots", ""), (path, "bad 404")
    assert not page.canonical, (path, "404 has unrelated canonical")
for agent in ("Googlebot", "Bingbot", "OAI-SearchBot"):
    status, html = fetch("/pricing", agent)
    assert status == 200 and "40 free credits" in html, (agent, "content unavailable")
print(json.dumps({"base": BASE, "pages": rows, "result": f"PASS: {len(rows)} pages, structured data, crawlers, sitemap and four 404 routes"}, indent=2))
