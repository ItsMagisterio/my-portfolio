import { Code2, Briefcase, Award, Layers } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const icons = [Code2, Briefcase, Layers, Award];

const AboutSection = () => {
  const { t } = useLang();

  return (
    <section id="about" aria-label="О разработчике" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.about.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
            {t.about.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Main bio */}
          <div className="glass-lg rounded-3xl p-8 md:p-10 lg:col-span-2">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-2">
              {t.about.bio1}
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.about.bio2.split(t.about.bio2School)[0]}
              <span className="font-semibold text-gray-700 dark:text-gray-300">{t.about.bio2School}</span>
              {t.about.bio2.split(t.about.bio2School)[1]}
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {t.about.cards.map(({ title, text }, i) => {
              const Icon = icons[i];
              return (
                <div key={title} className="glass-card rounded-3xl p-7 flex flex-col gap-4 w-full sm:w-72">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--icon-bg)", border: "1px solid var(--icon-border)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--tag-color)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
