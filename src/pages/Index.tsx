import Seo from "@/components/Seo";
import { defaultAlternates, localizedPath } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";
import seoData from "@/lib/seo-data.json";

const Index = () => {
  const { lang } = useLang();
  const seo = seoData.pages.home[lang];
  const canonicalPath = localizedPath(lang, "/");

  return (
    <>
      <Seo
        lang={lang}
        title={seo.title}
        description={seo.description}
        canonicalPath={canonicalPath}
        alternates={defaultAlternates("/")}
        imageAlt={seo.imageAlt}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
