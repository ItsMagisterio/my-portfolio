import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "dist";
const seoData = JSON.parse(readFileSync("src/lib/seo-data.json", "utf8"));
const { siteUrl, defaultRobots, pages } = seoData;

const localizedPath = (lang, path = "/") => {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\//, "").replace(/\/$/, "")}`;
  return lang === "en" ? (normalized === "/" ? "/en/" : `/en${normalized}`) : normalized;
};

const outputPath = (lang, basePath) => {
  if (basePath === "/") return lang === "ru" ? "index.html" : "en/index.html";
  const canonicalPath = localizedPath(lang, basePath);
  return `${canonicalPath.replace(/^\//, "")}/index.html`;
};

const absoluteUrl = (path) => `${siteUrl}${path}`;
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const pageEntries = Object.entries(pages).flatMap(([key, page]) =>
  ["ru", "en"].map((lang) => ({ key, page, lang, seo: page[lang] })),
);

for (const { key, page, lang, seo } of pageEntries) {
  const relativeFile = outputPath(lang, page.basePath);
  const file = join(DIST_DIR, relativeFile);
  assert(existsSync(file), `${relativeFile}: generated file is missing`);

  const html = readFileSync(file, "utf8");
  const canonicalPath = localizedPath(lang, page.basePath);
  const expectedRobots = page.indexable ? defaultRobots : "noindex, follow";
  const scripts = html.match(/<script\b[^>]*>/g) ?? [];
  const closedScripts = html.match(/<\/script>/g) ?? [];
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  assert(html.startsWith("<!DOCTYPE html>"), `${relativeFile}: missing doctype`);
  assert(html.includes(`<html lang="${lang}"`), `${relativeFile}: wrong html lang`);
  assert(html.indexOf('<meta charset="UTF-8"') > -1 && html.indexOf('<meta charset="UTF-8"') < 300, `${relativeFile}: charset must be early in head`);
  assert(html.includes(`<title>${seo.title}</title>`), `${relativeFile}: wrong title`);
  assert(html.includes(`name="description" content="${seo.description}"`), `${relativeFile}: wrong description`);
  assert(html.includes(`name="robots" content="${expectedRobots}"`), `${relativeFile}: wrong robots directive`);
  assert((html.match(/rel="canonical"/g) ?? []).length === 1, `${relativeFile}: expected one canonical`);
  assert(html.includes(`rel="canonical" href="${absoluteUrl(canonicalPath)}"`), `${relativeFile}: wrong canonical URL`);
  assert((html.match(/rel="alternate"/g) ?? []).length === 3, `${relativeFile}: expected 3 hreflang links`);
  assert(html.includes(`hreflang="ru" href="${absoluteUrl(localizedPath("ru", page.basePath))}"`), `${relativeFile}: missing ru hreflang`);
  assert(html.includes(`hreflang="en" href="${absoluteUrl(localizedPath("en", page.basePath))}"`), `${relativeFile}: missing en hreflang`);
  assert(html.includes(`hreflang="x-default" href="${absoluteUrl(localizedPath("ru", page.basePath))}"`), `${relativeFile}: missing x-default hreflang`);
  assert(html.includes('property="og:image:width" content="1200"'), `${relativeFile}: missing og image width`);
  assert(html.includes('property="og:image:height" content="630"'), `${relativeFile}: missing og image height`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'), `${relativeFile}: missing twitter card`);
  assert(/<script type="module"[^>]*src="\/assets\/[^"]+"><\/script>/.test(html), `${relativeFile}: module script is missing or not closed`);
  assert(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"/.test(html), `${relativeFile}: stylesheet asset is missing`);
  assert(scripts.length === closedScripts.length, `${relativeFile}: script tag mismatch (${scripts.length}/${closedScripts.length})`);
  assert(jsonLdBlocks.length >= (key === "home" ? 5 : 2), `${relativeFile}: not enough JSON-LD blocks`);
  for (const [, json] of jsonLdBlocks) JSON.parse(json);
  assert(html.includes("<noscript>") && html.includes("<h1"), `${relativeFile}: missing noscript h1 content`);

  if (page.basePath !== "/") {
    const aliasFile = join(DIST_DIR, `${canonicalPath.replace(/^\//, "")}.html`);
    assert(existsSync(aliasFile), `${aliasFile}: clean URL alias is missing`);
    assert(readFileSync(aliasFile, "utf8") === html, `${aliasFile}: clean URL alias differs from index HTML`);
  }
}

const sitemapFile = join(DIST_DIR, "sitemap.xml");
assert(existsSync(sitemapFile), "sitemap.xml is missing");
const sitemap = readFileSync(sitemapFile, "utf8");
assert(sitemap.includes(`<loc>${siteUrl}/</loc>`), "sitemap: missing ru home");
assert(sitemap.includes(`<loc>${siteUrl}/en/</loc>`), "sitemap: missing en home");
assert(!sitemap.includes("/terms"), "sitemap: noindex terms page must not be listed");
assert(!sitemap.includes("/copyright"), "sitemap: noindex copyright page must not be listed");

console.log(`SEO validation passed for ${pageEntries.length} generated pages.`);
