import { Github, MapPin, ArrowRight } from "lucide-react";
import avatar from "@/assets/avatar.png";
import { useLang } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLang();
  const stats = t.hero.stats;

  return (
    <section id="hero" aria-label="Главная — Богдан Вавренчук, Full-Stack Developer" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-24">
      <div className="aurora-orb w-[700px] h-[700px] bg-gray-200 dark:bg-zinc-800 top-[-15%] left-[-15%] opacity-50 dark:opacity-15" />
      <div className="aurora-orb w-[500px] h-[500px] bg-slate-200 dark:bg-slate-800 top-[30%] right-[-10%] opacity-35 dark:opacity-10" style={{ animationDelay: "5s" }} />
      <div className="aurora-orb w-[400px] h-[400px] bg-zinc-100 dark:bg-zinc-900 bottom-[0%] left-[10%] opacity-50 dark:opacity-15" style={{ animationDelay: "9s" }} />

      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Avatar */}
          <div className="animate-fade-in shrink-0">
            <div
              className="w-44 h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-black dark:border-white/95"
              style={{
                boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <img src={avatar} alt="Богдан Вавренчук — Full-Stack разработчик, Брест" width="208" height="208" className="w-full h-full object-cover" fetchPriority="high" decoding="sync" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            {/* Status pill */}
            <div
              className="animate-fade-in inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "var(--pill-bg)",
                border: "1px solid var(--pill-border)",
                color: "var(--pill-color)",
                animationDelay: "0.05s"
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              {t.hero.openTo}
            </div>

            {/* Name — H1 содержит полный SEO-текст, суффикс скрыт визуально */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-none mb-3">
                {t.hero.name}
                <span className="sr-only">{t.hero.h1Suffix}</span>
              </h1>
            </div>

            {/* Title */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium mb-2 tracking-wide">
                {t.hero.subtitle}
              </p>
              <p className="text-base text-gray-400 dark:text-gray-500 font-mono mb-8">
                @magister1o
              </p>
            </div>

            {/* Tagline */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg whitespace-pre-line">
                {t.hero.tagline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 animate-slide-up justify-center md:justify-start"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="https://t.me/magister1o"
                target="_blank"
                rel="noopener noreferrer"
                className="ios-button-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base"
              >
                {t.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/ItsMagisterio"
                target="_blank"
                rel="noopener noreferrer"
                className="ios-button-glass inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>

            {/* Location */}
            <div
              className="animate-slide-up flex items-center gap-2 text-gray-400 dark:text-gray-500 mt-6 text-sm justify-center md:justify-start"
              style={{ animationDelay: "0.5s" }}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.hero.location}</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="animate-slide-up mt-16 md:mt-20 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.55s" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center w-36">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
