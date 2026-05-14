import { Helmet } from "react-helmet-async";
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
  const canonical = "https://magister1o-portfolio.vercel.app/";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
      </Helmet>

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
