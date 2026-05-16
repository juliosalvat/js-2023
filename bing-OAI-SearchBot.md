# Bing &amp; OAI-SearchBot SEO Setup

**Date:** 2026-05-15
**Site:** https://juliosalvat.com (GitHub Pages, custom domain via `CNAME`)
**Goal:** Make the site discoverable in Bing &mdash; and therefore in ChatGPT search, which relies on Bing's index for web results.

---

## 1. Pages created

Eight new SEO landing pages were added to target specific role-based queries. Each page is a directory containing `index.html` so the URL resolves cleanly without `.html` extensions.

| URL | Purpose |
|-----|---------|
| `/software-engineer/` | Generalist senior-engineer / CTO positioning |
| `/full-stack-developer/` | React + Django/Node + AWS stack focus |
| `/react-developer/` | React, Next.js, TypeScript, dashboards, SaaS |
| `/ui-ux-designer/` | Dashboard UI, design systems, product UX |
| `/character-designer/` | 2D character design, concept art for animation |
| `/3d-character-design/` | ZBrush sculpting, Blender rigging, 3D characters |
| `/portfolio/` | Aggregator hub linking all practice areas |
| `/contact/` | Contact channels, engagement types, `ContactPoint` schema |

A shared `css/landing.css` powers the consistent dark-theme look across all 8 pages.

---

## 2. SEO essentials added to every page

Each of the 11 indexable pages (the 8 new + homepage + `/characters/` + `/ai-animation/`) now has:

- **Title tag** (target &le; 60 chars)
- **Meta description** (target 138&ndash;158 chars &mdash; inside Bing&rsquo;s 70&ndash;160 ideal range)
- **Canonical URL** (`<link rel="canonical">`)
- **Open Graph** tags (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`)
- **Twitter Card** tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- **Schema.org JSON-LD** &mdash; unified `Person` schema with:
  - `jobTitle` array: Software Engineer, UI/UX Designer, Character Designer, Full Stack Developer
  - `address` &rarr; California
  - `email`, `image`, `url`
  - `knowsAbout` array covering React, Node.js, UI/UX, Character Design, 3D Modeling, AI Automation, AWS, Python, etc.
  - `sameAs` &rarr; LinkedIn, GitHub, Twitter
  - The contact page also has a `ContactPoint` sub-schema

### Headline pattern

Each role page uses the &ldquo;Based in California&rdquo; headline format ChatGPT recommends for local + role discoverability:

> &ldquo;Software Engineer Based in California.&rdquo;
> &ldquo;UI / UX Designer Based in California.&rdquo;
> &ldquo;Character Designer Based in California.&rdquo;

The unified intro paragraph appears in the lede of every page:

> &ldquo;Julio Salvat is a software engineer, UI/UX designer, and character designer specializing in React, full-stack web applications, modern product design, dashboards, branding, 3D characters, and original animated character concepts.&rdquo;

### Target keyword phrases

Worked naturally into copy across the appropriate pages:

- software engineer in California
- React full stack developer
- UI UX designer for web apps
- dashboard UI designer
- modern portfolio website designer
- character designer for animation
- 3D character designer
- AI automation developer
- frontend developer for startups
- full stack developer for business dashboards

---

## 3. `robots.txt`

Already configured at the repo root. Explicitly allows AI search bots:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://juliosalvat.com/sitemap.xml
```

> **Note on GitHub Pages crawlability:** GitHub Pages does **not** inject any `X-Robots-Tag: noindex` header or otherwise block crawlers when served from a custom domain. Bingbot, OAI-SearchBot, GPTBot, and Googlebot can all crawl freely.

---

## 4. `sitemap.xml`

Lists all 11 URLs with `lastmod` 2026-05-15 and priorities:

- `/` &mdash; priority 1.0
- All landing pages &mdash; priority 0.9
- `/contact/`, `/characters/`, `/ai-animation/` &mdash; priority 0.8

Submit to Bing Webmaster Tools under **Sitemaps** &rarr; `https://juliosalvat.com/sitemap.xml`.

---

## 5. Bing Webmaster Tools

URL: https://www.bing.com/webmasters/

### Setup steps performed

1. Added site `https://juliosalvat.com`
2. Verified ownership (via `BingSiteAuth.xml` file or meta tag &mdash; either works on GitHub Pages)
3. Submitted sitemap

### Navigation (new UI as of 2026)

The old standalone &ldquo;Submit URLs&rdquo; tool is gone. URL submission now happens via:

- **URL Inspection** &rarr; &ldquo;Request indexing&rdquo; button (single URL)
- **Sitemaps** (bulk &mdash; one-time)
- **IndexNow** (modern bulk submission &mdash; see below)

---

## 6. IndexNow

IndexNow is the modern API-based way to ping search engines (Bing, Yandex, Seznam) about new or updated URLs. Bing&rsquo;s push for it replaced the legacy &ldquo;Submit URLs&rdquo; tool.

### Verification key

A verification key file lives at the repo root:

```
912a2d1f3ddc41038d81f8f1a6d08912.txt
```

Contents: just the key value `912a2d1f3ddc41038d81f8f1a6d08912`. Must be reachable at https://juliosalvat.com/912a2d1f3ddc41038d81f8f1a6d08912.txt for IndexNow to accept submissions.

### Submitting URLs (curl)

After any push that updates page metadata or content, re-fire this:

```bash
curl -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "juliosalvat.com",
    "key": "912a2d1f3ddc41038d81f8f1a6d08912",
    "keyLocation": "https://juliosalvat.com/912a2d1f3ddc41038d81f8f1a6d08912.txt",
    "urlList": [
      "https://juliosalvat.com/",
      "https://juliosalvat.com/portfolio/",
      "https://juliosalvat.com/contact/",
      "https://juliosalvat.com/software-engineer/",
      "https://juliosalvat.com/full-stack-developer/",
      "https://juliosalvat.com/react-developer/",
      "https://juliosalvat.com/ui-ux-designer/",
      "https://juliosalvat.com/character-designer/",
      "https://juliosalvat.com/3d-character-design/",
      "https://juliosalvat.com/characters/",
      "https://juliosalvat.com/ai-animation/"
    ]
  }'
```

### Expected response codes

| Code | Meaning |
|------|---------|
| 200 / 202 | Submitted successfully |
| 400 | Malformed request body |
| 403 | Key file not reachable at `keyLocation` (push hasn&rsquo;t deployed yet) |
| 422 | URLs don&rsquo;t match the declared `host` |

---

## 7. Bing-flagged issues fixed during this session

### Round 1 (initial inspection)

| Page | Issue | Fix |
|------|-------|-----|
| `/` | Title too long (79 chars) | Shortened to 60 chars |
| `/` | Meta Description tag missing | Added 147-char description |
| `/` | No structured markup found | Added Schema.org JSON-LD |
| `/characters/` | Same three issues | Same fixes applied |
| `/ai-animation/` | Same three issues | Same fixes applied |

### Round 2 (after re-inspection)

| Page | Issue | Fix |
|------|-------|-----|
| `/` | Meta Description too long or too short | All 11 page descriptions trimmed to 138&ndash;158 chars |
| `/` | Alt attribute for images is missing | Removed literal `<img>` text inside a CSS comment that Bing&rsquo;s regex parser was misreading as an alt-less image tag |

### Important Bing UX gotchas observed

- **&ldquo;Bing Index&rdquo; tab is cached.** It shows the snapshot from the last crawl, not the current state of the page. After pushing fixes, the panel still shows the old errors until Bing recrawls. Click &ldquo;Request indexing&rdquo; (or fire IndexNow) to trigger a re-crawl.
- **&ldquo;Live URL&rdquo; tab fetches in real time.** Use it to confirm Bing can see fixes immediately. Has flaky days &mdash; the &ldquo;Error encountered while inspecting Live URL&rdquo; message is usually transient; retry.
- **&ldquo;Indexing allowed: No&rdquo; for newly-discovered URLs.** This is a misleading transitional status, not a directive on the page. Bing crawled the URL but hasn&rsquo;t yet decided to index. Usually clears in 24&ndash;72 hours. Verified there is no `noindex` meta tag or `X-Robots-Tag` header on the site.

---

## 8. Files added or modified

### Added
- `sitemap.xml`
- `912a2d1f3ddc41038d81f8f1a6d08912.txt` (IndexNow key file)
- `css/landing.css` (shared styles for the 8 new landing pages)
- `software-engineer/index.html`
- `full-stack-developer/index.html`
- `react-developer/index.html`
- `ui-ux-designer/index.html`
- `character-designer/index.html`
- `3d-character-design/index.html`
- `portfolio/index.html`
- `contact/index.html`
- `bing-OAI-SearchBot.md` (this file)

### Modified
- `index.html` &mdash; new title, meta description, OG, Twitter, canonical, JSON-LD; removed bare `<img>` from CSS comment
- `characters/index.html` &mdash; same SEO additions
- `ai-animation/index.html` &mdash; same SEO additions
- `robots.txt` &mdash; (pre-existed) already had OAI-SearchBot allow rules and sitemap reference

---

## 9. Monitoring &amp; next steps

### What to check in Bing Webmaster Tools over the next few days

1. Re-inspect each of the 11 URLs &mdash; all should show **&ldquo;Indexed successfully&rdquo;** with **zero SEO/GEO errors**
2. Confirm **JSON-LD** and **OpenGraph** appear in the &ldquo;Markup types found&rdquo; panel for every page
3. Check **Search Performance** after 1&ndash;2 weeks for first impressions/clicks

### Discoverability beyond Bing

- **Google Search Console** &mdash; recommended next step for general SEO. Submit the same sitemap there.
- **Inbound links** &mdash; the cheapest discovery boost. Link to relevant landing pages from:
  - LinkedIn &ldquo;About&rdquo; / Featured section
  - GitHub profile README
  - Any other professional profiles
- **ChatGPT search** &mdash; pulls from Bing&rsquo;s index. No separate submission portal exists; getting indexed in Bing is the prerequisite, which is now done.

### When to re-fire IndexNow

Any time you push changes that affect:
- Page titles or meta descriptions
- Structured data (JSON-LD)
- Main page content
- New URLs

Just re-run the curl command from section 6. Takes 5 seconds.
