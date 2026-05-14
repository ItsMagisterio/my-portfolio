export type SeoLang = "ru" | "en";

export type AlternateDescriptor = {
  hreflang: string;
  href: string;
};

export const localizedPath = (lang: SeoLang, path = "/") => {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\//, "").replace(/\/$/, "")}`;

  if (lang === "en") {
    return normalized === "/" ? "/en/" : `/en${normalized}`;
  }

  return normalized;
};

export const defaultAlternates = (path = "/"): AlternateDescriptor[] => [
  { hreflang: "ru", href: localizedPath("ru", path) },
  { hreflang: "en", href: localizedPath("en", path) },
  { hreflang: "x-default", href: localizedPath("ru", path) },
];
