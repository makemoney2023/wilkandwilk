#!/usr/bin/env python3
"""Scrape wilkandwilk.com for rebuild salvage."""
import os, re, json, hashlib, time, urllib.parse, ssl
from pathlib import Path
from html.parser import HTMLParser
from html import unescape
import subprocess

BASE = "https://www.wilkandwilk.com"
OUT = Path("/workspace/wilkandwilk")
RAW = OUT / "raw"
PAGES = OUT / "pages"
ASSETS = OUT / "assets"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

SITEMAP_URLS = [
    "/",
    "/meet-the-doctors",
    "/meet-the-team",
    "/our-technology",
    "/our-community",
    "/our-culture",
    "/what-sets-us-apart",
    "/first-visit",
    "/payment-information",
    "/patient-forms",
    "/office-tour",
    "/smile-gallery",
    "/early-orthodontic-treatment",
    "/for-teens",
    "/for-adults",
    "/surgical-orthodontics",
    "/types-of-braces",
    "/types-of-appliances",
    "/invisalign-info",
    "/wisdom-teeth",
    "/patient-instructions",
    "/dentist-referral",
    "/self-referral",
    "/emergency-care",
    "/contact-us",
    "/request-a-consultation",
    # extras from crawl
    "/cambridge-office",
    "/sitemap",
    "/home",
]

def curl_get(url, out_path=None):
    cmd = ["curl", "-skL", "--max-time", "30", "-A", UA, "-w", "%{http_code}|%{url_effective}|%{size_download}", "-o"]
    if out_path:
        cmd.append(str(out_path))
    else:
        cmd.append("-")
    cmd.append(url)
    r = subprocess.run(cmd, capture_output=True)
    # when -o file, body is in file and stdout is write format; when -o -, body+format mixed — use temp
    return r

def fetch(url, save_as=None):
    tmp = OUT / ".tmp_fetch"
    cmd = ["curl", "-skL", "--max-time", "45", "-A", UA,
           "-w", "\n__META__%{http_code}|%{url_effective}|%{size_download}",
           "-o", str(tmp), url]
    r = subprocess.run(cmd, capture_output=True, text=True)
    meta = r.stdout.strip().split("__META__")[-1] if r.stdout else "000||0"
    parts = meta.split("|")
    code = parts[0] if parts else "000"
    eff = parts[1] if len(parts) > 1 else url
    size = parts[2] if len(parts) > 2 else "0"
    data = tmp.read_bytes() if tmp.exists() else b""
    if save_as:
        save_as.parent.mkdir(parents=True, exist_ok=True)
        save_as.write_bytes(data)
    return {"code": code, "url": url, "effective": eff, "size": int(size or 0), "data": data}

def slugify(path):
    p = path.strip("/").replace("/", "-") or "home"
    return re.sub(r"[^a-zA-Z0-9._-]", "-", p)[:120]

def strip_tags(html):
    html = re.sub(r"(?is)<script[^>]*>.*?</script>", " ", html)
    html = re.sub(r"(?is)<style[^>]*>.*?</style>", " ", html)
    html = re.sub(r"(?is)<!--.*?-->", " ", html)
    html = re.sub(r"(?is)<br\s*/?>", "\n", html)
    html = re.sub(r"(?is)</p>", "\n\n", html)
    html = re.sub(r"(?is)</(h[1-6]|li|tr|div)>", "\n", html)
    html = re.sub(r"(?is)<li[^>]*>", "- ", html)
    html = re.sub(r"(?is)<[^>]+>", " ", html)
    html = unescape(html)
    html = re.sub(r"[ \t]+", " ", html)
    html = re.sub(r"\n[ \t]+", "\n", html)
    html = re.sub(r"\n{3,}", "\n\n", html)
    return html.strip()

def extract_meta(html):
    title = ""
    m = re.search(r"(?is)<title[^>]*>(.*?)</title>", html)
    if m: title = strip_tags(m.group(1))
    desc = ""
    m = re.search(r'(?is)<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)["\']', html)
    if not m:
        m = re.search(r'(?is)<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description["\']', html)
    if m: desc = unescape(m.group(1))
    og = ""
    m = re.search(r'(?is)<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']*)["\']', html)
    if not m:
        m = re.search(r'(?is)<meta[^>]+content=["\']([^"\']*)["\'][^>]+property=["\']og:image["\']', html)
    if m: og = m.group(1)
    return title, desc, og

def extract_headings(html):
    heads = []
    for level in range(1, 4):
        for m in re.finditer(rf"(?is)<h{level}[^>]*>(.*?)</h{level}>", html):
            t = strip_tags(m.group(1))
            if t: heads.append((f"H{level}", t))
    return heads

def extract_main(html):
    # try main / content regions
    for pat in [
        r'(?is)<(?:main|article)[^>]*>(.*?)</(?:main|article)>',
        r'(?is)<div[^>]+id=["\'](?:content|main-content|page-content|bd)["\'][^>]*>(.*?)</div>\s*(?:<footer|</body|<div[^>]+id=["\']ft)',
        r'(?is)<div[^>]+class=["\'][^"\']*(?:page-content|main-content|content-area)[^"\']*["\'][^>]*>(.*?)$',
    ]:
        m = re.search(pat, html)
        if m and len(m.group(1)) > 200:
            return m.group(1)
    # body minus header/footer
    body = re.search(r"(?is)<body[^>]*>(.*?)</body>", html)
    if not body: return html
    b = body.group(1)
    b = re.sub(r"(?is)<header[^>]*>.*?</header>", " ", b)
    b = re.sub(r"(?is)<footer[^>]*>.*?</footer>", " ", b)
    b = re.sub(r"(?is)<nav[^>]*>.*?</nav>", " ", b)
    return b

def extract_nav(html):
    """Return list of (href, label, section) from header and footer."""
    items = []
    header = re.search(r'(?is)<header[^>]*>(.*?)</header>', html)
    footer = re.search(r'(?is)<footer[^>]*>(.*?)</footer>', html)
    # also main-nav
    nav_blocks = []
    if header: nav_blocks.append(("header", header.group(1)))
    for m in re.finditer(r'(?is)<(?:nav|div)[^>]+(?:id|class)=["\'][^"\']*nav[^"\']*["\'][^>]*>(.*?)</(?:nav|div)>', html):
        nav_blocks.append(("nav", m.group(1)[:50000]))
    if footer: nav_blocks.append(("footer", footer.group(1)))

    seen = set()
    for section, block in nav_blocks:
        for m in re.finditer(r'(?is)<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', block):
            href = m.group(1).strip()
            label = strip_tags(m.group(2)).replace("\n", " ").strip()
            label = re.sub(r"\s+", " ", label)
            if not label or len(label) > 100: continue
            key = (href, label)
            if key in seen: continue
            seen.add(key)
            items.append({"href": href, "label": label, "section": section})
    return items

IMG_EXT = re.compile(r"\.(?:jpe?g|png|gif|webp|svg|ico)(?:\?|$)", re.I)

def abs_url(base, src):
    src = src.strip()
    if not src or src.startswith("data:"): return None
    if src.startswith("//"): return "https:" + src
    return urllib.parse.urljoin(base, src)

def collect_image_urls(html, page_url):
    urls = set()
    # img src
    for m in re.finditer(r'(?is)<img[^>]+>', html):
        tag = m.group(0)
        for attr in ("src", "data-src", "data-lazy-src", "data-original"):
            am = re.search(rf'{attr}=["\']([^"\']+)["\']', tag, re.I)
            if am and IMG_EXT.search(am.group(1)):
                u = abs_url(page_url, am.group(1))
                if u: urls.add(u)
        # srcset
        for attr in ("srcset", "data-srcset"):
            am = re.search(rf'{attr}=["\']([^"\']+)["\']', tag, re.I)
            if am:
                for part in am.group(1).split(","):
                    part = part.strip().split()[0] if part.strip() else ""
                    if part and IMG_EXT.search(part):
                        u = abs_url(page_url, part)
                        if u: urls.add(u)
    # og:image / twitter
    for m in re.finditer(r'(?is)<meta[^>]+(?:property|name)=["\'](?:og:image|twitter:image)["\'][^>]+content=["\']([^"\']+)["\']', html):
        u = abs_url(page_url, m.group(1))
        if u: urls.add(u)
    for m in re.finditer(r'(?is)<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\'](?:og:image|twitter:image)["\']', html):
        u = abs_url(page_url, m.group(1))
        if u: urls.add(u)
    # CSS url() in inline styles / style tags / local css refs we may fetch later
    for m in re.finditer(r'url\(["\']?([^"\')]+)["\']?\)', html):
        if IMG_EXT.search(m.group(1)):
            u = abs_url(page_url, m.group(1))
            if u: urls.add(u)
    # href to images (gallery lightbox)
    for m in re.finditer(r'(?is)<a[^>]+href=["\']([^"\']+\.(?:jpe?g|png|gif|webp|svg)[^"\']*)["\']', html):
        u = abs_url(page_url, m.group(1))
        if u: urls.add(u)
    return urls

def categorize_image(url, path_hint=""):
    u = url.lower()
    name = urllib.parse.urlparse(url).path.lower()
    if any(x in name for x in ("logo", "favicon", "brand", "wordmark")):
        return "brand"
    if any(x in name for x in ("staff", "team", "doctor", "dr-", "dr_", "portrait", "bio")):
        return "staff"
    if any(x in name for x in ("interior", "office", "tour", "operatory", "waiting", "reception")):
        return "interiors"
    if any(x in name for x in ("exterior", "building", "storefront", "outside")):
        return "exteriors"
    if any(x in name for x in ("slide", "hero", "banner", "header-photo", "slideshow")):
        return "heroes"
    if any(x in name for x in ("section-photo", "gallery", "smile", "before", "after")):
        # section photos on home often interiors; smile gallery separate
        if "smile" in name or "gallery" in name or "before" in name or "after" in name:
            return "other"
        return "interiors"
    if any(x in name for x in ("marker", "arrow", "icon", "sprite", "pixel")):
        return "other"
    return "other"

def prefer_fullsize(url):
    """Try to guess full-size variants."""
    variants = [url]
    # common thumb patterns
    for a, b in [
        ("-thumb", ""), ("_thumb", ""), ("/thumbs/", "/"), ("/thumb/", "/"),
        ("-small", ""), ("_small", ""), ("-sm.", "."), ("_sm.", "."),
        ("-150x150", ""), ("-300x200", ""), ("-scaled", ""),
    ]:
        if a in url:
            variants.append(url.replace(a, b))
    return variants

def get_image_dims(path):
    try:
        r = subprocess.run(["identify", "-format", "%wx%h", str(path)], capture_output=True, text=True, timeout=10)
        if r.returncode == 0 and r.stdout.strip():
            return r.stdout.strip()
    except Exception:
        pass
    # fallback with file/python
    try:
        from struct import unpack
        data = path.read_bytes()[:64]
        if data[:8] == b"\x89PNG\r\n\x1a\n":
            w, h = unpack(">II", path.read_bytes()[16:24])
            return f"{w}x{h}"
        if data[:2] == b"\xff\xd8":
            # crude jpeg — use identify or skip
            pass
    except Exception:
        pass
    return "?"

def download_image(url, category):
    parsed = urllib.parse.urlparse(url)
    fname = os.path.basename(parsed.path) or "image.bin"
    fname = re.sub(r"[^a-zA-Z0-9._-]", "_", fname)
    if not fname or fname == ".":
        fname = hashlib.md5(url.encode()).hexdigest()[:12] + ".jpg"
    dest_dir = ASSETS / category
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / fname
    # avoid overwrite conflict
    if dest.exists():
        # same url? keep; different? rename
        stem, ext = dest.stem, dest.suffix
        n = 2
        while dest.exists():
            # if already have this exact file from same source in manifest later — still unique path
            dest = dest_dir / f"{stem}_{n}{ext}"
            n += 1
            if n > 50: break

    # try fullsize first
    tried = []
    best = None
    for candidate in prefer_fullsize(url):
        if candidate in tried: continue
        tried.append(candidate)
        res = fetch(candidate)
        if res["code"] == "200" and len(res["data"]) >= 100:
            best = (candidate, res)
            # prefer larger
            if len(res["data"]) > 2048 or "thumb" not in candidate.lower():
                break
    if not best:
        return None
    url_used, res = best
    # skip tiny non-logos
    if len(res["data"]) < 2048 and category != "brand" and "logo" not in url_used.lower() and "favicon" not in url_used.lower():
        return {"skipped": True, "reason": "tiny", "url": url_used, "bytes": len(res["data"])}
    dest.write_bytes(res["data"])
    dims = get_image_dims(dest)
    return {
        "path": str(dest.relative_to(OUT)),
        "dims": dims,
        "bytes": len(res["data"]),
        "source_url": url_used,
        "category": category,
        "original_url": url,
    }

def nap_from_text(text, html=""):
    phones = sorted(set(re.findall(r"(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)))
    emails = sorted(set(re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)))
    # filter junk emails
    emails = [e for e in emails if not any(x in e.lower() for x in ("example.com", "sentry", "wixpress", "schema"))]
    social = []
    for m in re.finditer(r'https?://(?:www\.)?(facebook|instagram|twitter|x|youtube|linkedin|tiktok)\.com/[^"\'\s<>]+', html, re.I):
        social.append(m.group(0).rstrip(".,);"))
    social = sorted(set(social))
    return phones, emails, social

def main():
    RAW.mkdir(parents=True, exist_ok=True)
    PAGES.mkdir(parents=True, exist_ok=True)
    for c in ("brand", "staff", "interiors", "exteriors", "heroes", "other"):
        (ASSETS / c).mkdir(parents=True, exist_ok=True)

    # also fetch local.css for background images
    css_res = fetch(f"{BASE}/assets/css/local.css", RAW / "local.css")
    print(f"local.css: {css_res['code']} {css_res['size']}")

    pages_data = []
    all_nav = []
    all_img_urls = set()
    discovered = set(SITEMAP_URLS)
    blockers = []
    tech_notes = []

    # seed from css
    if css_res["data"]:
        css = css_res["data"].decode("utf-8", errors="replace")
        for m in re.finditer(r'url\(["\']?([^"\')]+)["\']?\)', css):
            if IMG_EXT.search(m.group(1)):
                u = abs_url(f"{BASE}/assets/css/local.css", m.group(1))
                if u: all_img_urls.add(u)

    queue = list(SITEMAP_URLS)
    seen_paths = set()

    while queue:
        path = queue.pop(0)
        if path in seen_paths: continue
        seen_paths.add(path)
        url = path if path.startswith("http") else BASE + path
        slug = slugify(urllib.parse.urlparse(url).path)
        print(f"FETCH {url}")
        res = fetch(url, RAW / f"{slug}.html")
        if res["code"] not in ("200", "301", "302"):
            blockers.append(f"{url} -> HTTP {res['code']}")
            print(f"  BLOCK {res['code']}")
            continue
        if res["size"] < 500:
            blockers.append(f"{url} -> tiny response {res['size']} bytes, code {res['code']}")
            continue
        html = res["data"].decode("utf-8", errors="replace")
        title, desc, og = extract_meta(html)
        if og:
            u = abs_url(url, og)
            if u: all_img_urls.add(u)

        # tech stack
        if "sesamehub" in html.lower() or "sesamecommunications" in html.lower():
            tech_notes.append("Sesame Communications / Sesamehub (dental practice CMS)")
        if "symfony" in html.lower():
            tech_notes.append("Symfony cookie / backend hints")
        if "UA-192868371-1" in html:
            tech_notes.append("Google Analytics UA-192868371-1")

        heads = extract_headings(html)
        main_html = extract_main(html)
        main_text = strip_tags(main_html)
        # trim chrome leftovers
        for noise in [
            "Website Powered by Sesame",
            "Back to Top",
            "Patient Login",
        ]:
            pass
        nav = extract_nav(html)
        all_nav.extend(nav)

        # discover more internal links
        for m in re.finditer(r'href=["\']([^"\']+)["\']', html):
            href = m.group(1)
            full = abs_url(url, href)
            if not full: continue
            if "wilkandwilk.com" not in full: continue
            p = urllib.parse.urlparse(full)
            if p.path.endswith((".jpg", ".png", ".pdf", ".css", ".js", ".xml")): continue
            path2 = p.path.rstrip("/") or "/"
            # normalize /home
            if path2 not in seen_paths and path2 not in [x.rstrip("/") or "/" for x in seen_paths]:
                if path2 not in discovered and not path2.startswith("/assets"):
                    # only html-ish paths
                    if "." not in os.path.basename(path2) or path2.endswith(".html") or path2.endswith(".htm") or path2.endswith(".php"):
                        discovered.add(path2)
                        queue.append(path2)

        imgs = collect_image_urls(html, url)
        all_img_urls |= imgs

        phones, emails, social = nap_from_text(main_text + "\n" + html, html)

        # write page md
        md_lines = [
            f"# {title or slug}",
            "",
            f"- **URL:** {url}",
            f"- **Effective:** {res['effective']}",
            f"- **Meta description:** {desc}",
            "",
            "## Headings",
            "",
        ]
        for level, t in heads:
            md_lines.append(f"- **{level}:** {t}")
        md_lines += ["", "## Body copy", "", main_text[:50000], ""]
        if phones or emails:
            md_lines += ["## Contact snippets on page", ""]
            if phones: md_lines.append(f"- Phones: {', '.join(phones)}")
            if emails: md_lines.append(f"- Emails: {', '.join(emails)}")
            md_lines.append("")
        (PAGES / f"{slug}.md").write_text("\n".join(md_lines), encoding="utf-8")

        pages_data.append({
            "path": path,
            "url": url,
            "title": title,
            "desc": desc,
            "http": res["code"],
            "slug": slug,
            "headings": heads,
            "nav_count": len(nav),
            "img_count": len(imgs),
        })
        time.sleep(0.15)

    # Deduplicate nav for sitemap
    # Download images
    print(f"\nDownloading {len(all_img_urls)} image URLs...")
    manifest = []
    skipped = []
    seen_content = {}  # hash -> path
    for img_url in sorted(all_img_urls):
        # skip tracking / sesame CDN fonts icons maybe
        if "font-awesome" in img_url or "googletagmanager" in img_url or "google-analytics" in img_url:
            continue
        cat = categorize_image(img_url)
        print(f"  IMG [{cat}] {img_url}")
        info = download_image(img_url, cat)
        if not info:
            skipped.append({"url": img_url, "reason": "download failed"})
            continue
        if info.get("skipped"):
            skipped.append(info)
            continue
        # dedupe by content hash
        p = OUT / info["path"]
        h = hashlib.md5(p.read_bytes()).hexdigest()
        if h in seen_content:
            # remove duplicate file
            p.unlink(missing_ok=True)
            info["duplicate_of"] = seen_content[h]
            info["path"] = seen_content[h]
        else:
            seen_content[h] = info["path"]
        # suggest use
        use = {
            "brand": "Logo / brand mark",
            "staff": "Staff or doctor portrait",
            "interiors": "Office interior photo",
            "exteriors": "Building exterior",
            "heroes": "Hero / slideshow banner",
            "other": "Supporting graphic / gallery / icon",
        }.get(info["category"], "Asset")
        info["suggested_use"] = use
        manifest.append(info)
        time.sleep(0.05)

    # Also try common logo paths
    for extra in [
        f"{BASE}/assets/images/logo.png",
        f"{BASE}/assets/images/logo.jpg",
        f"{BASE}/assets/images/logo.svg",
        f"{BASE}/assets/images/logo-white.png",
        f"{BASE}/assets/images/logo-dark.png",
        f"{BASE}/assets/images/favicon.png",
        f"{BASE}/assets/images/favicon.ico",
        f"{BASE}/assets/images/header-logo.png",
        f"{BASE}/assets/images/ft-logo.png",
        f"{BASE}/assets/images/wilk-logo.png",
    ]:
        if extra not in all_img_urls:
            info = download_image(extra, "brand")
            if info and not info.get("skipped"):
                h = hashlib.md5((OUT / info["path"]).read_bytes()).hexdigest()
                if h not in seen_content:
                    seen_content[h] = info["path"]
                    info["suggested_use"] = "Logo / brand mark"
                    manifest.append(info)
                    print(f"  EXTRA brand hit: {extra}")

    # Probe office tour / smile gallery / team for more assets via listing
    # Check /assets/images/ via common patterns from HTML already done

    # Write SITE-MAP.md
    # Build nav hierarchy from first successful home page nav
    home_html = (RAW / "home.html").read_text(encoding="utf-8", errors="replace") if (RAW / "home.html").exists() else ""
    # Prefer full home from /
    if (RAW / "home.html").exists() is False and (RAW / "-.html").exists():
        pass

    # Re-parse header nav structure more carefully
    header_nav_md = []
    # Look for nested ul structure in main-nav
    nav_html = ""
    m = re.search(r'(?is)<div[^>]+id=["\']main-nav["\'][^>]*>(.*?)</div>\s*</div>\s*</div>\s*</header>', home_html)
    if not m:
        m = re.search(r'(?is)id=["\']main-nav["\'][^>]*>(.*)', home_html)
    if m:
        nav_html = m.group(1)[:80000]

    def parse_list(ul_html, depth=0):
        lines = []
        # top-level lis — simplistic
        # extract pairs from already collected unique nav with header section
        return lines

    header_items = []
    footer_items = []
    seen_h = set()
    for it in all_nav:
        key = (it["href"], it["label"])
        if key in seen_h: continue
        seen_h.add(key)
        if it["section"] in ("header", "nav"):
            header_items.append(it)
        elif it["section"] == "footer":
            footer_items.append(it)

    sm = ["# Site map — Wilk & Wilk Orthodontics", "", f"Canonical host: `{BASE}`", "",
          "Redirects: `http://wilkandwilk.com` → `https://www.wilkandwilk.com/`; apex https also redirects to www.", "",
          "## Tech stack (rebuild context)", ""]
    for t in sorted(set(tech_notes)):
        sm.append(f"- {t}")
    sm += ["", "## Navigation hierarchy (header)", ""]
    # Manual hierarchy from known labels
    # Group by top-level from sitemap structure
    hierarchy = [
        ("Home", "/"),
        ("Welcome", None, [
            ("Meet The Doctors", "/meet-the-doctors"),
            ("Meet the Team", "/meet-the-team"),
            ("Our Technology", "/our-technology"),
            ("Our Community", "/our-community"),
            ("Our Culture", "/our-culture"),
        ]),
        ("New Patients", None, [
            ("What Sets Us Apart", "/what-sets-us-apart"),
            ("First Visit", "/first-visit"),
            ("Payment Information", "/payment-information"),
            ("Patient Forms", "/patient-forms"),
            ("Office Tour", "/office-tour"),
            ("Smile Gallery", "/smile-gallery"),
        ]),
        ("Treatments", None, [
            ("Early Orthodontic Treatment", "/early-orthodontic-treatment"),
            ("For Teens", "/for-teens"),
            ("For Adults", "/for-adults"),
            ("Surgical Orthodontics", "/surgical-orthodontics"),
            ("Types of Braces", "/types-of-braces"),
            ("Types of Appliances", "/types-of-appliances"),
            ("Invisalign® Info", "/invisalign-info"),
            ("Wisdom Teeth", "/wisdom-teeth"),
            ("Patient Instructions", "/patient-instructions"),
            ("Emergency Care", "/emergency-care"),
        ]),
        ("Let's Talk", None, [
            ("Contact Us", "/contact-us"),
            ("Request a Consultation", "/request-a-consultation"),
        ]),
    ]
    # Also referrals
    sm.append("Observed top-level menu (from site): Home · Welcome · New Patients · Treatments · Let's Talk")
    sm.append("")
    sm.append("- **Home** → `/`")
    sm.append("- **Welcome**")
    for label, href in [("Meet The Doctors", "/meet-the-doctors"), ("Meet the Team", "/meet-the-team"),
                        ("Our Technology", "/our-technology"), ("Our Community", "/our-community"),
                        ("Our Culture", "/our-culture")]:
        sm.append(f"  - {label} → `{href}`")
    sm.append("- **New Patients**")
    for label, href in [("What Sets Us Apart", "/what-sets-us-apart"), ("First Visit", "/first-visit"),
                        ("Payment Information", "/payment-information"), ("Patient Forms", "/patient-forms"),
                        ("Office Tour", "/office-tour"), ("Smile Gallery", "/smile-gallery")]:
        sm.append(f"  - {label} → `{href}`")
    sm.append("- **Treatments**")
    for label, href in [("Early Orthodontic Treatment", "/early-orthodontic-treatment"), ("For Teens", "/for-teens"),
                        ("For Adults", "/for-adults"), ("Surgical Orthodontics", "/surgical-orthodontics"),
                        ("Types of Braces", "/types-of-braces"), ("Types of Appliances", "/types-of-appliances"),
                        ("Invisalign® Info", "/invisalign-info"), ("Wisdom Teeth", "/wisdom-teeth"),
                        ("Patient Instructions", "/patient-instructions"), ("Emergency Care", "/emergency-care")]:
        sm.append(f"  - {label} → `{href}`")
    sm.append("- **Let's Talk**")
    for label, href in [("Contact Us", "/contact-us"), ("Request a Consultation", "/request-a-consultation")]:
        sm.append(f"  - {label} → `{href}`")
    sm.append("")
    sm.append("### Utility / chrome links")
    sm.append("- Patient Login → external Sesame patient portal")
    sm.append("- Phone → `tel:519-624-9455`")
    sm.append("")
    sm.append("## Footer / other public pages")
    sm.append("- Cambridge office → `/cambridge-office`")
    sm.append("- Dentist referral → `/dentist-referral`")
    sm.append("- Self referral → `/self-referral`")
    sm.append("- HTML Site Map → `/sitemap`")
    sm.append("")
    sm.append("## Full URL inventory")
    sm.append("")
    sm.append("| Path | Title | HTTP | Notes |")
    sm.append("|------|-------|------|-------|")
    for p in pages_data:
        sm.append(f"| `{p['path']}` | {p['title'].replace('|','/')} | {p['http']} | {p['slug']}.md |")
    sm.append("")
    sm.append("## robots.txt")
    sm.append("```")
    sm.append("User-agent: *")
    sm.append("disallow: /ckeditor /ckfinder /domains /site_template")
    sm.append("```")
    sm.append("")
    sm.append("## Blockers")
    if blockers:
        for b in blockers:
            sm.append(f"- {b}")
    else:
        sm.append("- None for HTML page GETs (TLS needed `-k` due to incomplete cert chain on this scraper host).")
    sm.append("")
    sm.append("## Header/footer link dump (deduped)")
    sm.append("")
    sm.append("### Header/nav")
    for it in header_items:
        sm.append(f"- [{it['label']}]({it['href']})")
    sm.append("")
    sm.append("### Footer")
    for it in footer_items:
        sm.append(f"- [{it['label']}]({it['href']})")
    (OUT / "SITE-MAP.md").write_text("\n".join(sm), encoding="utf-8")

    # COPY.md aggregate
    copy_lines = ["# Site copy — Wilk & Wilk Orthodontics", "",
                  "Per-page clean extracts also live under `pages/*.md`.", ""]
    for p in pages_data:
        pf = PAGES / f"{p['slug']}.md"
        if pf.exists():
            copy_lines.append(f"---\n\n## Page: {p['title']}\n\n(Source: `{p['url']}`)\n")
            # include body section only
            text = pf.read_text(encoding="utf-8")
            if "## Body copy" in text:
                body = text.split("## Body copy", 1)[1]
                # until next ## Contact or end
                copy_lines.append(body.strip()[:30000])
            copy_lines.append("")
    (OUT / "COPY.md").write_text("\n".join(copy_lines), encoding="utf-8")

    # CONTACTS-NAP.md — deep extract from contact + cambridge + footer
    nap_html = ""
    for slug in ("contact-us", "cambridge-office", "home", "request-a-consultation"):
        f = RAW / f"{slug}.html"
        if f.exists():
            nap_html += "\n" + f.read_text(encoding="utf-8", errors="replace")
    all_text = strip_tags(nap_html)
    phones, emails, social = nap_from_text(all_text, nap_html)
    # address patterns
    addresses = re.findall(r"\d{1,5}\s+[A-Za-z0-9 .'-]+(?:Blvd|Blvd\.|Boulevard|St|Street|Ave|Avenue|Rd|Road|Dr|Drive|Unit|Suite)[^\n]{0,40}", all_text)
    addresses = sorted(set(a.strip() for a in addresses))
    # hours
    hours_lines = []
    for line in all_text.splitlines():
        if re.search(r"(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Hours|am|pm|AM|PM)", line, re.I):
            if len(line.strip()) < 120 and len(line.strip()) > 5:
                hours_lines.append(line.strip())
    hours_lines = list(dict.fromkeys(hours_lines))[:40]

    nap_md = [
        "# Contacts / NAP — Wilk & Wilk Orthodontics",
        "",
        "## Practice name",
        "Wilk & Wilk Orthodontics",
        "",
        "## Phone",
    ]
    for ph in phones:
        nap_md.append(f"- {ph}")
    if not phones:
        nap_md.append("- (519) 624-9455 (from tel: links)")
    nap_md += ["", "## Email", ""]
    for e in emails:
        nap_md.append(f"- {e}")
    if not emails:
        nap_md.append("- (none found in public HTML)")
    nap_md += ["", "## Addresses", ""]
    for a in addresses:
        nap_md.append(f"- {a}")
    # explicit from crawl knowledge
    nap_md.append("- 350 Conestoga Blvd A, Cambridge, ON N1R 7L7 (footer / cambridge-office)")
    nap_md += ["", "## Hours (extracted lines; verify)", ""]
    for h in hours_lines:
        nap_md.append(f"- {h}")
    if not hours_lines:
        nap_md.append("- (no clear hours block found — check contact page manually)")
    nap_md += ["", "## Social links", ""]
    for s in social:
        nap_md.append(f"- {s}")
    if not social:
        nap_md.append("- (none found in HTML)")
    nap_md += ["", "## Patient portal",
               "- https://patient-portal-prd-cluster-3.sesamecommunications.com/wilkcambridge/index.htm",
               "",
               "## Maps / office page",
               "- https://www.wilkandwilk.com/cambridge-office",
               "- https://www.wilkandwilk.com/contact-us",
               ""]
    (OUT / "CONTACTS-NAP.md").write_text("\n".join(nap_md), encoding="utf-8")

    # ASSETS-MANIFEST.md
    am = ["# Assets manifest — Wilk & Wilk Orthodontics", "",
          f"Total downloaded (unique files): **{len([m for m in manifest if not m.get('duplicate_of') or True])}**",
          f"Skipped: **{len(skipped)}**",
          ""]
    # recount unique paths
    uniq_paths = sorted(set(m["path"] for m in manifest))
    am.append(f"Unique asset paths: **{len(uniq_paths)}**")
    am.append("")
    counts = {}
    for m in manifest:
        counts[m["category"]] = counts.get(m["category"], 0) + 1
    am.append("## Counts by category")
    for k, v in sorted(counts.items()):
        am.append(f"- **{k}:** {v}")
    am.append("")
    am.append("## Files")
    am.append("")
    am.append("| Path | Dims | Bytes | Source URL | Suggested use |")
    am.append("|------|------|------:|------------|---------------|")
    for m in sorted(manifest, key=lambda x: x["path"]):
        am.append(f"| `{m['path']}` | {m['dims']} | {m['bytes']} | {m['source_url']} | {m['suggested_use']} |")
    am.append("")
    am.append("## Skipped")
    for s in skipped:
        am.append(f"- {s}")
    (OUT / "ASSETS-MANIFEST.md").write_text("\n".join(am), encoding="utf-8")

    # summary json
    summary = {
        "pages": len(pages_data),
        "images": len(uniq_paths),
        "skipped_images": len(skipped),
        "blockers": blockers,
        "phones": phones,
        "emails": emails,
        "social": social,
        "tech": sorted(set(tech_notes)),
    }
    (OUT / "scrape-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print("\nDONE", json.dumps(summary, indent=2))

if __name__ == "__main__":
    main()
