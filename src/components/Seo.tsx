import { useEffect } from "react";
import type { AlternateDescriptor, SeoLang } from "@/lib/seo";

const SITE_URL = "https://magister1o-portfolio.vercel.app";

type MetaDescriptor = {
  name?: string;
  property?: string;
  content: string;
};

type SeoProps = {
  lang: SeoLang;
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "profile" | "article";
  alternates?: AlternateDescriptor[];
  meta?: MetaDescriptor[];
};

const absoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const removeManagedAlternates = () => {
  document.head
    .querySelectorAll('link[rel="alternate"][data-managed-seo="true"]')
    .forEach((node) => node.remove());
};

const Seo = ({
  lang,
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  image = `${SITE_URL}/og-image.png`,
  imageAlt = "Богдан Вавренчук — Full-Stack Developer, Брест, Беларусь",
  type = "website",
  alternates = [],
  meta = [],
}: SeoProps) => {
  useEffect(() => {
    const canonical = absoluteUrl(canonicalPath);
    const locale = lang === "ru" ? "ru_RU" : "en_US";
    const alternateLocale = lang === "ru" ? "en_US" : "ru_RU";

    document.documentElement.lang = lang;
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

    removeManagedAlternates();
    alternates.forEach((alternate) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", alternate.hreflang);
      link.setAttribute("href", absoluteUrl(alternate.href));
      link.setAttribute("data-managed-seo", "true");
      document.head.appendChild(link);
    });

    const baseMeta: MetaDescriptor[] = [
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:locale", content: locale },
      { property: "og:locale:alternate", content: alternateLocale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
      ...meta,
    ];

    baseMeta.forEach((item) => {
      if (item.name) {
        upsertMeta(`meta[name="${item.name}"]`, { name: item.name, content: item.content });
      }

      if (item.property) {
        upsertMeta(`meta[property="${item.property}"]`, { property: item.property, content: item.content });
      }
    });
  }, [alternates, canonicalPath, description, image, imageAlt, lang, meta, robots, title, type]);

  return null;
};

export default Seo;
