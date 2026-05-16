import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import { developerProfile, getCanonicalUrl, getRouteSeo, siteConfig } from "@/config/site";

type MetaDescriptor = {
  selector: string;
  attrs: Record<string, string>;
};

const absoluteAssetUrl = (assetPath: string) => {
  if (assetPath.startsWith("http")) return assetPath;
  return `${siteConfig.siteUrl}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};

const upsertMeta = ({ selector, attrs }: MetaDescriptor) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (rel: string, href: string, extraAttrs: Record<string, string> = {}) => {
  const hreflangSelector = extraAttrs.hreflang ? `[hreflang="${extraAttrs.hreflang}"]` : "";
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${hreflangSelector}`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
  Object.entries(extraAttrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const removeJsonLd = (id: string) => {
  document.head.querySelector<HTMLScriptElement>(`script#${id}`)?.remove();
};

const buildWebPageSchema = (title: string, description: string, canonical: string, lang: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${canonical}#webpage`,
  url: canonical,
  name: title,
  description,
  inLanguage: lang,
  isPartOf: {
    "@id": `${siteConfig.siteUrl}/#website`,
  },
  author: {
    "@id": `${siteConfig.siteUrl}/#developer`,
  },
});

const buildHomeSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      url: `${siteConfig.siteUrl}/`,
      name: siteConfig.siteName,
      inLanguage: developerProfile.knowsLanguage,
      publisher: {
        "@id": `${siteConfig.siteUrl}/#developer`,
      },
    },
    {
      "@type": ["Person", "SoftwareDeveloper"],
      "@id": `${siteConfig.siteUrl}/#developer`,
      name: developerProfile.name,
      alternateName: developerProfile.alternateName,
      url: `${siteConfig.siteUrl}/`,
      image: absoluteAssetUrl(siteConfig.defaultImage),
      jobTitle: developerProfile.jobTitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Брест",
        addressCountry: "BY",
      },
      knowsAbout: developerProfile.knowsAbout,
      knowsLanguage: developerProfile.knowsLanguage,
      sameAs: siteConfig.profiles,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.siteUrl}/#service`,
      name: "Full-Stack разработка сайтов и приложений — magister1o",
      url: `${siteConfig.siteUrl}/`,
      provider: {
        "@id": `${siteConfig.siteUrl}/#developer`,
      },
      serviceType: ["Full-Stack development", "Web development", "Frontend development", "Backend development", "SEO optimization"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://t.me/magister1o",
      },
    },
  ],
});

export const Seo = () => {
  const location = useLocation();
  const { lang } = useLang();
  const routeSeo = getRouteSeo(location.pathname);
  const isNotFound = !routeSeo;
  const canonical = getCanonicalUrl(isNotFound ? "/" : routeSeo.path);
  const ogImage = absoluteAssetUrl(siteConfig.defaultImage);
  const title = isNotFound
    ? lang === "ru"
      ? "Страница не найдена — magister1o"
      : "Page not found — magister1o"
    : routeSeo.title[lang];
  const description = isNotFound
    ? lang === "ru"
      ? "Страница портфолио magister1o не найдена. Вернитесь на главную страницу, чтобы посмотреть проекты, навыки и контакты разработчика."
      : "The magister1o portfolio page was not found. Return to the homepage to view projects, skills and developer contacts."
    : routeSeo.description[lang];
  const robots = isNotFound ? "noindex, follow" : routeSeo.robots;
  const locale = lang === "ru" ? "ru_RU" : "en_US";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;

    const metaTags: MetaDescriptor[] = [
      { selector: 'meta[name="title"]', attrs: { name: "title", content: title } },
      { selector: 'meta[name="description"]', attrs: { name: "description", content: description } },
      { selector: 'meta[name="author"]', attrs: { name: "author", content: siteConfig.author } },
      { selector: 'meta[name="robots"]', attrs: { name: "robots", content: robots } },
      { selector: 'meta[name="googlebot"]', attrs: { name: "googlebot", content: robots } },
      { selector: 'meta[name="yandex"]', attrs: { name: "yandex", content: robots } },
      { selector: 'meta[name="theme-color"]', attrs: { name: "theme-color", content: "#f5f5f7" } },
      { selector: 'meta[property="og:type"]', attrs: { property: "og:type", content: isNotFound ? "website" : "profile" } },
      { selector: 'meta[property="og:url"]', attrs: { property: "og:url", content: canonical } },
      { selector: 'meta[property="og:title"]', attrs: { property: "og:title", content: title } },
      { selector: 'meta[property="og:description"]', attrs: { property: "og:description", content: description } },
      { selector: 'meta[property="og:image"]', attrs: { property: "og:image", content: ogImage } },
      { selector: 'meta[property="og:image:width"]', attrs: { property: "og:image:width", content: "1200" } },
      { selector: 'meta[property="og:image:height"]', attrs: { property: "og:image:height", content: "630" } },
      { selector: 'meta[property="og:image:alt"]', attrs: { property: "og:image:alt", content: title } },
      { selector: 'meta[property="og:site_name"]', attrs: { property: "og:site_name", content: siteConfig.siteName } },
      { selector: 'meta[property="og:locale"]', attrs: { property: "og:locale", content: locale } },
      { selector: 'meta[name="twitter:card"]', attrs: { name: "twitter:card", content: "summary_large_image" } },
      { selector: 'meta[name="twitter:url"]', attrs: { name: "twitter:url", content: canonical } },
      { selector: 'meta[name="twitter:title"]', attrs: { name: "twitter:title", content: title } },
      { selector: 'meta[name="twitter:description"]', attrs: { name: "twitter:description", content: description } },
      { selector: 'meta[name="twitter:image"]', attrs: { name: "twitter:image", content: ogImage } },
      { selector: 'meta[name="twitter:image:alt"]', attrs: { name: "twitter:image:alt", content: title } },
      { selector: 'meta[name="twitter:creator"]', attrs: { name: "twitter:creator", content: "@magister1o" } },
    ];

    metaTags.forEach(upsertMeta);
    upsertLink("canonical", canonical);
    upsertLink("alternate", `${siteConfig.siteUrl}/`, { hreflang: "ru" });
    upsertLink("alternate", `${siteConfig.siteUrl}/`, { hreflang: "en" });
    upsertLink("alternate", `${siteConfig.siteUrl}/`, { hreflang: "x-default" });

    upsertJsonLd("route-jsonld", buildWebPageSchema(title, description, canonical, lang));

    if (location.pathname === "/") {
      upsertJsonLd("home-jsonld", buildHomeSchema());
    } else {
      removeJsonLd("home-jsonld");
    }
  }, [canonical, description, isNotFound, lang, locale, location.pathname, ogImage, robots, title]);

  return null;
};
