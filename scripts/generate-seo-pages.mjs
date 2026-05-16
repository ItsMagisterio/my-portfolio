import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const DIST_DIR = "dist";
const seoData = JSON.parse(readFileSync("src/lib/seo-data.json", "utf8"));
const SITE_URL = seoData.siteUrl;
const BUILD_DATE = seoData.buildDate;
const DEFAULT_ROBOTS = seoData.defaultRobots;
const OG_IMAGE = `${SITE_URL}${seoData.ogImagePath}`;
const homeSeo = seoData.pages.home;
const legalSeo = {
  terms: seoData.pages.terms,
  copyright: seoData.pages.copyright,
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const absoluteUrl = (path) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const localizedPath = (lang, path = "/") => {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\//, "").replace(/\/$/, "")}`;
  if (lang === "en") return normalized === "/" ? "/en/" : `/en${normalized}`;
  return normalized;
};

const alternates = (path = "/") => [
  { hreflang: "ru", href: localizedPath("ru", path) },
  { hreflang: "en", href: localizedPath("en", path) },
  { hreflang: "x-default", href: localizedPath("ru", path) },
];

const baseHeadLinks = () => `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="Богдан Вавренчук (magister1o)" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="application-name" content="magister1o — Portfolio" />
    <meta name="color-scheme" content="dark light" />
    <meta name="google-site-verification" content="412f0887e4608c8b" />
    <meta name="yandex-verification" content="1530d5ee6e11bcff" />
    <meta name="geo.region" content="BY-BR" />
    <meta name="geo.placename" content="Брест, Беларусь" />
    <meta name="geo.position" content="52.0976;23.6843" />
    <meta name="ICBM" content="52.0976, 23.6843" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://github.com" />
    <link rel="dns-prefetch" href="https://t.me" />
    <link rel="dns-prefetch" href="https://www.linkedin.com" />
    <link rel="icon" type="image/jpeg" href="/logo-dark.jpg" />
    <link rel="apple-touch-icon" href="/logo-dark.jpg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="magister1o" />`;

const metaTag = (name, content) => `    <meta name="${name}" content="${escapeHtml(content)}" />`;
const propertyTag = (property, content) => `    <meta property="${property}" content="${escapeHtml(content)}" />`;
const linkTag = (rel, attrs) =>
  `    <link rel="${rel}" ${Object.entries(attrs)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(" ")} />`;
const jsonLd = (data) => `    <script type="application/ld+json">${JSON.stringify(data, null, 2).replaceAll("</", "<\\/")}</script>`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Богдан Вавренчук",
  givenName: "Богдан",
  familyName: "Вавренчук",
  alternateName: ["magister1o", "Bogdan Vavrenchuk", "ItsMagisterio", "Богдан Ваврэнчук"],
  url: `${SITE_URL}/`,
  image: {
    "@type": "ImageObject",
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    caption: "Богдан Вавренчук — Full-Stack Developer из Бреста, Беларусь",
  },
  jobTitle: "Middle Full-Stack Developer",
  description:
    "Middle Full-Stack разработчик из Бреста, Беларусь. 4 года коммерческого опыта. Специализация — разработка сайтов, веб-приложений и Android-приложений под ключ.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Брест",
    addressRegion: "Брестская область",
    addressCountry: "BY",
    postalCode: "224000",
  },
  knowsAbout: [
    "Full-Stack Web Development",
    "Backend Development",
    "Frontend Development",
    "Java",
    "Spring Boot",
    "Kotlin",
    "C#",
    ".NET",
    "TypeScript",
    "React",
    "Vite",
    "PHP",
    "Laravel",
    "Python",
    "Django",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "SEO",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Russian", alternateName: "ru" },
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Belarusian", alternateName: "be" },
  ],
  sameAs: [
    "https://github.com/ItsMagisterio",
    "https://t.me/magister1o",
    "https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/",
    "https://www.twitch.tv/magister1o",
  ],
};

const portfolioItems = [
  ["Katkova House", "https://katkova-house.ru/", "Коммерческий сайт жилого комплекса — Full-Stack разработка под ключ."],
  ["Shina24", undefined, "Сайт выездного шиномонтажа в Москве. React, Vite, SEO-оптимизация."],
  ["Kondey", undefined, "Корпоративный сайт сервиса заправки кондиционеров. React, Vite, SEO."],
  ["FlashTanki", undefined, "Воссозданный Flash-сервер Tanki Online на Java и ActionScript 3."],
  ["Gtanks", undefined, "Браузерный игровой сервер на Java/ActionScript 3."],
  ["CyberTankz", undefined, "Java-реализация игрового сервера в стиле Tanki Online."],
  ["Tanki X", undefined, "3D-клон Tanki Online на Unity/C# с современной графикой."],
  ["CS:GO GS", undefined, "C++ эмулятор GameState Integration для CS:GO."],
  ["PSGEK", "https://psgek.belarus.by/", "Призёрский проект конкурса «100 идей для Беларуси» — 3 место из 54 работ."],
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Богдан Вавренчук — разработка сайтов",
  alternateName: ["magister1o", "Web Developer Brest", "Bogdan Vavrenchuk"],
  description:
    "Разработка сайтов и веб-приложений под ключ. Full-Stack разработчик Богдан Вавренчук (magister1o). 4 года коммерческого опыта, реальные проекты для бизнеса.",
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  founder: { "@id": `${SITE_URL}/#person` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Брест",
    addressRegion: "Брестская область",
    addressCountry: "BY",
    postalCode: "224000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.0976,
    longitude: 23.6843,
  },
  areaServed: [
    { "@type": "City", name: "Брест" },
    { "@type": "City", name: "Минск" },
    { "@type": "Country", name: "Беларусь" },
    { "@type": "Country", name: "Россия" },
    { "@type": "Country", name: "Польша" },
  ],
  currenciesAccepted: "USD, EUR, BYN, RUB",
  paymentAccepted: "Bank Transfer, PayPal, Cryptocurrency",
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceUrl: "https://t.me/magister1o",
      name: "Telegram",
      availableLanguage: ["Russian", "English"],
    },
    {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/",
      name: "LinkedIn",
      availableLanguage: ["Russian", "English"],
    },
  ],
  sameAs: ["https://github.com/ItsMagisterio", "https://t.me/magister1o", "https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/"],
};

const faqSchema = (lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (lang === "ru"
    ? [
        [
          "Кто такой Богдан Вавренчук (magister1o)?",
          "Богдан Вавренчук (magister1o) — Middle Full-Stack Developer из Бреста, Беларусь. 4 года коммерческого опыта, проекты Katkova House, Shina24, Kondey и PSGEK.",
        ],
        [
          "Какие технологии использует magister1o?",
          "Java, Spring Boot, Kotlin, C#, TypeScript, React, Vite, PHP, Python, Node.js, MySQL, PostgreSQL, Docker и Tailwind CSS.",
        ],
        [
          "Как заказать разработку сайта?",
          "Напишите в Telegram @magister1o или LinkedIn, опишите задачу и получите оценку сроков и стоимости.",
        ],
        [
          "Делаете ли вы SEO-оптимизацию?",
          "Да: техническое SEO, JSON-LD, meta-теги, robots.txt, sitemap.xml, canonical, оптимизация LCP и индексации.",
        ],
      ]
    : [
        [
          "Who is Bogdan Vavrenchuk (magister1o)?",
          "Bogdan Vavrenchuk (magister1o) is a Middle Full-Stack Developer from Brest, Belarus with 4 years of commercial experience.",
        ],
        [
          "Which technologies does magister1o use?",
          "Java, Spring Boot, Kotlin, C#, TypeScript, React, Vite, PHP, Python, Node.js, MySQL, PostgreSQL, Docker and Tailwind CSS.",
        ],
        [
          "How can I order website development?",
          "Contact @magister1o on Telegram or LinkedIn, describe your task and receive an estimate for timeline and cost.",
        ],
        [
          "Do you provide SEO optimization?",
          "Yes: technical SEO, JSON-LD, meta tags, robots.txt, sitemap.xml, canonical URLs, LCP and indexability optimization.",
        ],
      ]
  ).map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
});

const homeSchemas = (lang) => [
  personSchema,
  localBusinessSchema,
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: homeSeo[lang].siteName,
    description: homeSeo[lang].description,
    inLanguage: lang,
    datePublished: "2024-01-01",
    dateModified: BUILD_DATE,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${localizedPath(lang, "/")}#profilepage`,
    url: absoluteUrl(localizedPath(lang, "/")),
    name: homeSeo[lang].title,
    description: homeSeo[lang].description,
    dateCreated: "2024-01-01",
    dateModified: BUILD_DATE,
    inLanguage: lang,
    mainEntity: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "ru" ? "Главная" : "Home",
        item: absoluteUrl(localizedPath(lang, "/")),
      },
    ],
  },
  faqSchema(lang),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "ru" ? "Портфолио — Богдан Вавренчук" : "Portfolio — Bogdan Vavrenchuk",
    description: lang === "ru" ? "Коммерческие и личные проекты Full-Stack разработчика" : "Commercial and personal Full-Stack developer projects",
    numberOfItems: portfolioItems.length,
    itemListElement: portfolioItems.map(([name, url, description], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": url ? "WebSite" : "SoftwareApplication",
        name,
        ...(url ? { url } : { applicationCategory: "SoftwareApplication" }),
        description,
        author: { "@id": `${SITE_URL}/#person` },
      },
    })),
  },
];

const legalSchemas = (key, lang) => {
  const page = legalSeo[key];
  const seo = page[lang];
  const path = localizedPath(lang, page.basePath);
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: seo.title,
      description: seo.description,
      inLanguage: lang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      dateModified: BUILD_DATE,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "ru" ? "Главная" : "Home", item: absoluteUrl(localizedPath(lang, "/")) },
        { "@type": "ListItem", position: 2, name: seo.heading, item: absoluteUrl(path) },
      ],
    },
  ];
};

const buildHead = ({ lang, title, description, canonicalPath, robots = DEFAULT_ROBOTS, alternatesFor = "/", type = "website", schemas = [], assetTags, lcpImagePreload = "" }) => {
  const canonical = absoluteUrl(canonicalPath);
  const locale = lang === "ru" ? "ru_RU" : "en_US";
  const alternateLocale = lang === "ru" ? "en_US" : "ru_RU";
  return `<head>
${baseHeadLinks()}
    <title>${escapeHtml(title)}</title>
${metaTag("description", description)}
${metaTag("robots", robots)}
${linkTag("canonical", { href: canonical })}
${alternates(alternatesFor).map((item) => linkTag("alternate", { hreflang: item.hreflang, href: absoluteUrl(item.href) })).join("\n")}
${propertyTag("og:type", type)}
${propertyTag("og:url", canonical)}
${propertyTag("og:title", title)}
${propertyTag("og:description", description)}
${propertyTag("og:image", OG_IMAGE)}
${propertyTag("og:image:width", "1200")}
${propertyTag("og:image:height", "630")}
${propertyTag("og:image:type", "image/png")}
${propertyTag("og:image:alt", lang === "ru" ? homeSeo.ru.imageAlt : homeSeo.en.imageAlt)}
${propertyTag("og:site_name", lang === "ru" ? homeSeo.ru.siteName : homeSeo.en.siteName)}
${propertyTag("og:locale", locale)}
${propertyTag("og:locale:alternate", alternateLocale)}
${metaTag("twitter:card", "summary_large_image")}
${metaTag("twitter:creator", "@magister1o")}
${metaTag("twitter:title", title)}
${metaTag("twitter:description", description)}
${metaTag("twitter:image", OG_IMAGE)}
${metaTag("twitter:image:alt", lang === "ru" ? homeSeo.ru.imageAlt : homeSeo.en.imageAlt)}
${schemas.map(jsonLd).join("\n")}
${lcpImagePreload}
${assetTags}
  </head>`;
};

const homeNoscript = (lang) => {
  if (lang === "en") {
    return `<noscript>
      <main itemscope itemtype="https://schema.org/Person">
        <h1 itemprop="name">Bogdan Vavrenchuk — Full-Stack Web Developer | Brest, Belarus</h1>
        <p itemprop="description"><strong>Bogdan Vavrenchuk</strong> (<strong>magister1o</strong>) is a Middle Full-Stack developer from Brest, Belarus with 4 years of commercial experience. I build turnkey websites, web applications, and mobile applications.</p>
        <nav aria-label="Navigation"><a href="#about">About</a> | <a href="#skills">Skills</a> | <a href="#projects">Projects</a> | <a href="/en/terms">Terms</a> | <a href="/en/copyright">Copyright</a></nav>
        <section aria-label="About the developer"><h2>About</h2><p>Certified Java developer (MyIT, Brest, 2022). Location: <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">Brest</span>, <span itemprop="addressCountry">Belarus</span></span>. PSGEK contest prize winner — 3rd place out of 54 works.</p></section>
        <section aria-label="Technologies"><h2>Technologies</h2><ul><li><strong>Languages:</strong> Java, Kotlin, C#, JavaScript, TypeScript, PHP, Python, C++</li><li><strong>Frontend:</strong> React, Vite, Tailwind CSS, HTML5, CSS3</li><li><strong>Backend:</strong> Spring Boot, Ktor, ASP.NET, Django, Flask, Node.js, Express.js, Laravel</li><li><strong>Databases:</strong> MySQL, PostgreSQL</li><li><strong>DevOps:</strong> Docker, Git, Linux</li></ul></section>
        <section aria-label="Portfolio"><h2>Commercial projects</h2><ul><li><a href="https://katkova-house.ru/"><strong>Katkova House</strong></a> — residential complex website</li><li><strong>Shina24</strong> — mobile tire service website, Moscow</li><li><strong>Kondey</strong> — air conditioner service website, Moscow</li><li><a href="https://psgek.belarus.by/"><strong>PSGEK</strong></a> — 3rd place out of 54 works, energy contest</li></ul></section>
        <section aria-label="Contacts"><h2>Contacts</h2><p>Telegram: <a href="https://t.me/magister1o">@magister1o</a></p><p>GitHub: <a href="https://github.com/ItsMagisterio">ItsMagisterio</a></p><p>LinkedIn: <a href="https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/">Bogdan Vavrenchuk</a></p></section>
      </main>
    </noscript>`;
  }

  return `<noscript>
      <main itemscope itemtype="https://schema.org/Person">
        <h1 itemprop="name">Богдан Вавренчук — Full-Stack разработчик сайтов | Брест, Беларусь</h1>
        <p itemprop="description"><strong>Богдан Вавренчук</strong> (никнейм <strong>magister1o</strong>) — Middle Full-Stack разработчик из Бреста, Беларусь. 4 года коммерческого опыта. Специализируюсь на разработке сайтов, веб-приложений и мобильных приложений под ключ.</p>
        <nav aria-label="Навигация"><a href="#about">Обо мне</a> | <a href="#skills">Навыки</a> | <a href="#projects">Проекты</a> | <a href="/terms">Условия использования</a> | <a href="/copyright">Авторские права</a></nav>
        <section aria-label="О разработчике"><h2>О разработчике</h2><p>Сертифицированный Java-разработчик (MyIT, Брест, 2022). Локация: <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">Брест</span>, <span itemprop="addressCountry">Беларусь</span></span>. Призёр конкурса PSGEK — 3 место из 54 работ в городе.</p></section>
        <section aria-label="Технологии"><h2>Технологии</h2><ul><li><strong>Языки:</strong> Java, Kotlin, C#, JavaScript, TypeScript, PHP, Python, C++</li><li><strong>Frontend:</strong> React, Vite, Tailwind CSS, HTML5, CSS3</li><li><strong>Backend:</strong> Spring Boot, Ktor, ASP.NET, Django, Flask, Node.js, Express.js, Laravel</li><li><strong>Базы данных:</strong> MySQL, PostgreSQL</li><li><strong>DevOps:</strong> Docker, Git, Linux</li></ul></section>
        <section aria-label="Портфолио"><h2>Коммерческие проекты</h2><ul><li><a href="https://katkova-house.ru/"><strong>Katkova House</strong></a> — сайт жилого комплекса</li><li><strong>Shina24</strong> — сайт выездного шиномонтажа, Москва</li><li><strong>Kondey</strong> — сайт сервиса кондиционеров, Москва</li><li><a href="https://psgek.belarus.by/"><strong>PSGEK</strong></a> — 3 место из 54 работ, конкурс по энергетике</li></ul></section>
        <section aria-label="Контакты"><h2>Контакты</h2><p>Telegram: <a href="https://t.me/magister1o">@magister1o</a></p><p>GitHub: <a href="https://github.com/ItsMagisterio">ItsMagisterio</a></p><p>LinkedIn: <a href="https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/">Богдан Вавренчук</a></p></section>
      </main>
    </noscript>`;
};

const legalNoscript = (key, lang) => {
  const page = legalSeo[key];
  const seo = page[lang];
  return `<noscript><main><h1>${escapeHtml(seo.heading)}</h1><p>${escapeHtml(seo.intro)}</p><nav><a href="${localizedPath(lang, "/")}">${lang === "ru" ? "На главную" : "Home"}</a></nav></main></noscript>`;
};

const template = readFileSync(join(DIST_DIR, "index.html"), "utf8");
const assetTags = [...template.matchAll(/\n\s*(?:<script\b[^>]*><\/script>|<link\b[^>]*>)/g)]
  .map((match) => match[0])
  .filter((tag) => tag.includes("/assets/"))
  .join("\n");
const avatarAsset = readdirSync(join(DIST_DIR, "assets")).find((asset) => /^avatar-.*\.png$/.test(asset));
const lcpImagePreload = avatarAsset
  ? `    <link rel="preload" as="image" href="/assets/${avatarAsset}" fetchpriority="high" />`
  : "";
const body = template.match(/<body>[\s\S]*<\/body>/)?.[0];
if (!body) throw new Error("Could not find <body> in dist/index.html");

const renderPage = ({ outputPath, lang, head, noscript }) => {
  const html = `<!DOCTYPE html>\n<html lang="${lang}" prefix="og: https://ogp.me/ns#">\n  ${head}\n  ${body.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript)}\n</html>\n`;
  const filePath = join(DIST_DIR, outputPath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
  return html;
};

for (const lang of ["ru", "en"]) {
  const canonicalPath = localizedPath(lang, "/");
  renderPage({
    outputPath: lang === "ru" ? "index.html" : "en/index.html",
    lang,
    head: buildHead({
      lang,
      ...homeSeo[lang],
      canonicalPath,
      alternatesFor: "/",
      schemas: homeSchemas(lang),
      assetTags,
      lcpImagePreload,
    }),
    noscript: homeNoscript(lang),
  });
}

for (const key of Object.keys(legalSeo)) {
  for (const lang of ["ru", "en"]) {
    const page = legalSeo[key];
    const seo = page[lang];
    const canonicalPath = localizedPath(lang, page.basePath);
    const html = renderPage({
      outputPath: canonicalPath.replace(/^\//, "") + (canonicalPath.endsWith("/") ? "index.html" : "/index.html"),
      lang,
      head: buildHead({
        lang,
        title: seo.title,
        description: seo.description,
        canonicalPath,
        robots: "noindex, follow",
        alternatesFor: page.basePath,
        type: "article",
        schemas: legalSchemas(key, lang),
        assetTags,
      }),
      noscript: legalNoscript(key, lang),
    });

    const cleanUrlAlias = join(DIST_DIR, `${canonicalPath.replace(/^\//, "")}.html`);
    mkdirSync(dirname(cleanUrlAlias), { recursive: true });
    writeFileSync(cleanUrlAlias, html);
  }
}

const sitemapEntries = Object.values(seoData.pages)
  .filter((page) => page.indexable)
  .flatMap((page) =>
    ["ru", "en"].map((lang) => ({
      loc: absoluteUrl(localizedPath(lang, page.basePath)),
      priority: page.basePath === "/" ? (lang === "ru" ? "1.0" : "0.9") : "0.5",
      changefreq: page.basePath === "/" ? "weekly" : "monthly",
    })),
  );

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST_DIR, "sitemap.xml"), sitemap);

console.log("Generated SEO static pages: /, /en/, /terms/, /en/terms/, /copyright/, /en/copyright/");
