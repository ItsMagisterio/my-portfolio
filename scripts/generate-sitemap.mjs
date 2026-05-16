import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const routesConfigPath = resolve(rootDir, "src/config/routes.json");
const sitemapPath = resolve(rootDir, "public/sitemap.xml");
const robotsPath = resolve(rootDir, "public/robots.txt");

const routesConfig = JSON.parse(await readFile(routesConfigPath, "utf8"));
const siteUrl = routesConfig.siteUrl.replace(/\/$/, "");

const urls = routesConfig.routes
  .map((route) => {
    const loc = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_vercel/
Disallow: /404

Sitemap: ${siteUrl}/sitemap.xml
`;

await writeFile(sitemapPath, sitemap);
await writeFile(robotsPath, robots);

console.log(`Generated sitemap with ${routesConfig.routes.length} routes.`);
