import { Code, Database, Globe, Smartphone, Terminal, Wrench } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Globe,
    items: ["React", "TypeScript", "HTML/CSS", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend",
    icon: Database,
    items: ["Java", "Kotlin", "C#", "SQL"],
  },
  {
    category: "Языки",
    icon: Code,
    items: ["JavaScript", "TypeScript", "Java", "Kotlin", "C#", "Python (базовый)"],
  },
  {
    category: "Инструменты",
    icon: Wrench,
    items: ["IntelliJ IDEA", "PyCharm", "VS Code", "Notepad++", "FlashDevelop", "FFDEC"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Навыки</span> & Технологии
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Постоянно изучаю новые технологии и совершенствую свои навыки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="liquid-glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-shadow group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{skill.category}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li 
                    key={item}
                    className="text-muted-foreground font-mono text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
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
