"""Notify IndexNow participants after deployment. Preview by default; use --submit to send."""
import argparse
import json
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request

SITE = "https://www.cnvrted.com"
KEY_PATH = "/indexnow-key.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", help="Changed canonical paths, e.g. /about /learn/buying-signals")
    parser.add_argument("--submit", action="store_true", help="Verify the deployed key, then notify IndexNow")
    args = parser.parse_args()
    urls = []
    for path in args.paths:
        parts = urllib.parse.urlsplit(path)
        if not path.startswith("/") or path.startswith("//") or parts.query or parts.fragment or parts.scheme or parts.netloc:
            parser.error("Use canonical site paths without query strings or fragments")
        urls.append(SITE + path)
    urls = list(dict.fromkeys(urls))
    if not args.submit:
        print(json.dumps({"mode": "preview", "urls": urls}, indent=2))
        return
    key = (Path(__file__).resolve().parents[1] / "public" / KEY_PATH.lstrip("/")).read_text().strip()
    if not re.fullmatch(r"[a-f0-9]{32}", key):
        parser.error("Invalid site-verification key")
    with urllib.request.urlopen(SITE + KEY_PATH, timeout=30) as response:
        if response.status != 200 or response.read().decode().strip() != key:
            parser.error("The key is not deployed on the canonical host; nothing was submitted")
    payload = {"host": "www.cnvrted.com", "key": key, "keyLocation": SITE + KEY_PATH, "urlList": urls}
    request = urllib.request.Request(ENDPOINT, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            status = response.status
    except urllib.error.HTTPError as error:
        raise SystemExit(f"IndexNow returned HTTP {error.code}; no automatic retry was made") from None
    if status not in (200, 202):
        raise SystemExit(f"Unexpected IndexNow response: HTTP {status}")
    print(json.dumps({"status": status, "urls": urls, "result": "received" if status == 200 else "received; key validation pending", "note": "Receipt is not confirmation of indexing."}, indent=2))


if __name__ == "__main__":
    main()
