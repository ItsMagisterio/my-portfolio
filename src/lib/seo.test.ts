import { describe, expect, it } from "vitest";
import seoData from "./seo-data.json";
import { defaultAlternates, localizedPath } from "./seo";

describe("SEO route helpers", () => {
  it("builds localized canonical paths", () => {
    expect(localizedPath("ru", "/")).toBe("/");
    expect(localizedPath("en", "/")).toBe("/en/");
    expect(localizedPath("ru", "/terms/")).toBe("/terms");
    expect(localizedPath("en", "/terms/")).toBe("/en/terms");
  });

  it("builds reciprocal hreflang alternates", () => {
    expect(defaultAlternates("/copyright")).toEqual([
      { hreflang: "ru", href: "/copyright" },
      { hreflang: "en", href: "/en/copyright" },
      { hreflang: "x-default", href: "/copyright" },
    ]);
  });

  it("keeps shared SEO page data complete for both languages", () => {
    for (const page of Object.values(seoData.pages)) {
      expect(page.basePath).toMatch(/^\//);
      expect(page.ru.title.length).toBeGreaterThan(10);
      expect(page.ru.description.length).toBeGreaterThan(50);
      expect(page.en.title.length).toBeGreaterThan(10);
      expect(page.en.description.length).toBeGreaterThan(50);
    }
  });
});
