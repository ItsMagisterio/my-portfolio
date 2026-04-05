import { Code, Database, Globe, Wrench, Terminal, BookOpen } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const skillIcons = [BookOpen, Globe, Code, Database, Terminal, Wrench];

const skillItems = [
  ["Java", "Kotlin", "C#", "JavaScript", "TypeScript", "Python", "PHP"],
  ["React", "HTML / CSS", "Tailwind CSS", "Vite"],
  ["Java (Spring)", "Kotlin (Ktor / Spring)", "C# (.NET)", "PHP", "Python (Django / Flask)", "Node.js (JavaScript runtime)"],
  ["MySQL", "PostgreSQL", "SQL"],
  ["IntelliJ IDEA", "WebStorm", "Rider", "PyCharm", "PhpStorm", "DataGrip"],
  ["Notepad++", "XAMPP", "FlashDevelop", "Denver", "Docker"],
];

const SkillsSection = () => {
  const { t } = useLang();

  const skills = t.skills.categories.map((category, i) => ({
    category,
    icon: skillIcons[i],
    items: skillItems[i],
  }));

  return (
    <section id="skills" aria-label="Технологии и инструменты" className="py-24 px-4 relative">
      <div className="aurora-orb w-[400px] h-[400px] bg-gray-200 dark:bg-zinc-800 top-[10%] right-[-5%] opacity-40 dark:opacity-10" />
      <div className="aurora-orb w-[350px] h-[350px] bg-slate-200 dark:bg-slate-800 bottom-[5%] left-[-5%] opacity-35 dark:opacity-10" style={{ animationDelay: "6s" }} />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.skills.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
            {t.skills.heading}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            {t.skills.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="glass-card rounded-3xl p-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2.5 rounded-2xl"
                  style={{ background: "var(--icon-bg)", border: "1px solid var(--icon-border)" }}
                >
                  <skill.icon className="w-5 h-5" style={{ color: "var(--tag-color)" }} />
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">{skill.category}</h3>
              </div>

              <ul className="space-y-2.5">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--tag-color)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
