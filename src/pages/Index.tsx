import Seo from "@/components/Seo";
import { defaultAlternates, localizedPath } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import { useLang } from "@/contexts/LanguageContext";

const SEO_RU = {
  title: "Богдан Вавренчук — Full-Stack разработчик | Брест, Беларусь",
  description:
    "Middle Full-Stack разработчик из Бреста с 4 годами коммерческого опыта. Разработка сайтов, веб-приложений и мобильных приложений под ключ. Java, React, TypeScript, Kotlin, C#, PHP, Python.",
};

const SEO_EN = {
  title: "Bogdan Vavrenchuk — Full-Stack Developer | Brest, Belarus",
  description:
    "Middle Full-Stack developer from Brest with 4 years of commercial experience. Turnkey development of websites, web apps and mobile apps. Java, React, TypeScript, Kotlin, C#, PHP, Python.",
};

const Index = () => {
  const { lang } = useLang();
  const seo = lang === "ru" ? SEO_RU : SEO_EN;
  const canonicalPath = localizedPath(lang, "/");

  return (
    <>
      <Seo
        lang={lang}
        title={seo.title}
        description={seo.description}
        canonicalPath={canonicalPath}
        alternates={defaultAlternates("/")}
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
