import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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
  assert(html.includes('rel="manifest" href="/site.webmanifest"'), `${relativeFile}: missing web manifest link`);
  assert(html.includes('name="format-detection" content="telephone=no"'), `${relativeFile}: missing mobile format detection meta`);
  assert(html.includes('name="color-scheme" content="dark light"'), `${relativeFile}: missing color-scheme meta`);
  if (key === "home") {
    assert(/<link rel="preload" as="image" href="\/assets\/avatar-[^"]+\.png" fetchpriority="high" \/>/.test(html), `${relativeFile}: missing LCP avatar preload`);
  }
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

const manifestFile = join(DIST_DIR, "site.webmanifest");
assert(existsSync(manifestFile), "site.webmanifest is missing");
const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
assert(manifest.name && manifest.short_name && manifest.start_url === "/", "manifest: missing required app metadata");

const maxAssetBytes = 800 * 1024;
for (const asset of readdirSync(join(DIST_DIR, "assets"))) {
  const size = statSync(join(DIST_DIR, "assets", asset)).size;
  assert(size <= maxAssetBytes, `asset budget exceeded: ${asset} is ${size} bytes`);
}

for (const asset of readdirSync(join(DIST_DIR, "assets")).filter((asset) => asset.endsWith(".svg"))) {
  const svg = readFileSync(join(DIST_DIR, "assets", asset), "utf8").trimStart();
  assert(svg.startsWith("<svg"), `svg asset is not a valid SVG document: ${asset}`);
  assert(!/<html[\s>]/i.test(svg), `svg asset unexpectedly contains HTML: ${asset}`);
}

const vercelConfig = JSON.parse(readFileSync("vercel.json", "utf8"));
for (const source of ["/en", "/terms/", "/en/terms/", "/copyright/", "/en/copyright/"]) {
  assert(vercelConfig.redirects?.some((redirect) => redirect.source === source && redirect.permanent === true), `vercel: missing permanent redirect for ${source}`);
}
for (const source of ["/terms", "/en/terms", "/copyright", "/en/copyright"]) {
  assert(
    vercelConfig.headers?.some((entry) => entry.source === source && entry.headers.some((header) => header.key === "X-Robots-Tag" && header.value === "noindex, follow")),
    `vercel: missing X-Robots-Tag for ${source}`,
  );
}
const globalHeaders = vercelConfig.headers?.find((entry) => entry.source === "/(.*)")?.headers ?? [];
for (const key of ["X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
  assert(globalHeaders.some((header) => header.key === key), `vercel: missing global ${key} header`);
}

console.log(`SEO validation passed for ${pageEntries.length} generated pages.`);
