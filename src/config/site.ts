import routesConfig from "./routes.json";

export type SupportedLang = "ru" | "en";

export type SeoRoute = {
  path: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  robots: string;
  title: Record<SupportedLang, string>;
  description: Record<SupportedLang, string>;
};

export const siteConfig = routesConfig as typeof routesConfig & {
  routes: SeoRoute[];
};

export const developerProfile = {
  name: "Богдан Вавренчук",
  alternateName: ["magister1o", "Bogdan Vavrenchuk", "Богдан (magister1o)"],
  handle: "magister1o",
  jobTitle: "Full-Stack Developer",
  location: "Брест, Беларусь",
  knowsLanguage: ["ru", "en"],
  knowsAbout: [
    "Java",
    "Kotlin",
    "C#",
    "JavaScript",
    "TypeScript",
    "React",
    "Vite",
    "Tailwind CSS",
    "PHP",
    "Python",
    "MySQL",
    "PostgreSQL",
    "Spring",
    ".NET",
    "Docker",
    "SEO optimization",
  ],
};

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  return `${siteConfig.siteUrl}${normalizedPath}`;
};

export const getRouteSeo = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  return siteConfig.routes.find((route) => route.path === normalizedPath);
};
