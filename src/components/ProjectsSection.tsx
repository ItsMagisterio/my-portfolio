import { useState } from "react";
import { ExternalLink, Github, Gamepad2, Zap, Home, Snowflake, ChevronDown, ChevronUp } from "lucide-react";
import flashtankiLogo from "@/assets/flashtanki-logo.png";
import psgekLogo from "@/assets/psgek-logo.png";
import katkovaLogo from "@/assets/katkova-logo.png";
import gtanksLogo from "@/assets/gtanks-logo.png";

const projects = [
  {
    title: "Gtanks",
    description: "Новый амбициозный проект по воссозданию классического танкового геймплея на Java и ActionScript 3 (Flash Player).",
    image: gtanksLogo,
    tags: ["Java", "AS3", "Flash Player"],
    github: "https://github.com/ItsMagisterio",
    icon: Gamepad2,
    inDevelopment: true,
  },
  {
    title: "FlashTanki",
    description: "Браузерная игра про танки, написанная на Java и ActionScript 3 (Flash Player). Мультиплеерный геймплей с реалистичной физикой.",
    image: flashtankiLogo,
    tags: ["Java", "AS3", "Flash Player"],
    github: "https://github.com/ItsMagisterio",
    icon: Gamepad2,
    frozen: true,
  },
  {
    title: "ПСГЭК",
    description: "Сайт разработанный специально для конкурса «100 идей для Беларуси» в номинации по энергетике. Проект посвящён альтернативным источникам энергии.",
    image: psgekLogo,
    tags: ["React", "Конкурс", "Энергетика"],
    link: "https://psgek.belarus.by/",
    icon: Zap,
    inDevelopment: true,
  },
  {
    title: "Katkova House",
    description: "Коммерческий сайт разработанный по заказу. Современный дизайн и полная функциональность для бизнеса.",
    image: katkovaLogo,
    tags: ["WordPress", "Коммерческий", "На заказ"],
    link: "https://katkova-house.ru/",
    icon: Home,
  },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-hero">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Мои <span className="text-gradient">Проекты</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Проекты, над которыми я работаю в свободное время и на заказ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={project.title}
              className="liquid-glass rounded-xl overflow-hidden card-shadow group relative"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-secondary/50 flex items-center justify-center overflow-hidden">
                {project.frozen && (
                  <div className="absolute -right-8 top-5 z-10 rotate-45 bg-blue-500 text-white text-xs font-bold px-10 py-1 shadow-lg">
                    Заморожен
                  </div>
                )}
                {project.inDevelopment && (
                  <div className="absolute -right-10 top-5 z-10 rotate-45 bg-amber-500 text-white text-xs font-bold px-10 py-1 shadow-lg">
                    {project.title === "Gtanks" ? "MVP/Alpha" : "В разработке"}
                  </div>
                )}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <project.icon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && !project.title.toLowerCase().includes("tanki") && !project.title.toLowerCase().includes("gtanks") && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Код
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Сайт
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors font-semibold border border-border"
            >
              {showAll ? (
                <>
                  Скрыть <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Показать все <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
