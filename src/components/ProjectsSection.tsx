import { useState } from "react";
import { ExternalLink, Github, Gamepad2, Zap, Home, ChevronDown, ChevronUp, SearchCheck, HelpCircle, Lock, Pin, ShieldCheck, Cpu } from "lucide-react";
import flashtankiLogo from "@/assets/flashtanki-logo.png";
import psgekLogo from "@/assets/psgek-logo.png";
import katkovaLogo from "@/assets/katkova-logo.png";
import gtanksLogo from "@/assets/gtanks-logo.png";
import vivrLogo from "@/assets/vivr-logo.png";
import cybertankzLogo from "@/assets/cybertankz-logo.png";
import tankixLogo from "@/assets/tankix-logo.png";
import kufarChekerLogo from "@/assets/kufar-cheker-logo.png";
import csgoGsLogo from "@/assets/csgo-gs-logo.png";
import comingSoonLogo from "@/assets/coming-soon-logo.png";
import { useLang } from "@/contexts/LanguageContext";

const projectImages = [
  comingSoonLogo,
  katkovaLogo,
  vivrLogo,
  gtanksLogo,
  flashtankiLogo,
  psgekLogo,
  cybertankzLogo,
  tankixLogo,
  csgoGsLogo,
  kufarChekerLogo,
];

const projectIcons = [Lock, Home, SearchCheck, Gamepad2, Gamepad2, Zap, Gamepad2, Gamepad2, Cpu, ShieldCheck];

const projectLinks: (string | undefined)[] = [
  undefined,
  "https://katkova-house.ru/",
  "https://vivr.by/",
  undefined,
  undefined,
  "https://psgek.belarus.by/",
  undefined,
  undefined,
  undefined,
  "http://kufarcheker.rf.gd/",
];

const projectGithubs: (string | undefined)[] = [
  undefined,
  undefined,
  undefined,
  "https://github.com/ItsMagisterio",
  "https://github.com/ItsMagisterio",
  undefined,
  undefined,
  undefined,
  "https://github.com/ItsMagisterio",
  undefined,
];

const projectStatuses = [
  { topSecret: true, pinned: true },
  { completed: true },
  { completed: true },
  { completed: true },
  { frozen: true },
  { prize: "3 место из 54 работ в городе" },
  { frozen: true },
  { earlyDev: true },
  { inDevelopment: true },
  { thinking: true },
];

const getStatusKey = (status: Record<string, any>): string | null => {
  if (status.frozen) return "frozen";
  if (status.inDevelopment) return "inDevelopment";
  if (status.completed) return "completed";
  if (status.prize) return "prize";
  if (status.earlyDev) return "earlyDev";
  if (status.topSecret) return "topSecret";
  if (status.thinking) return "thinking";
  return null;
};

const badgeColors: Record<string, { bg: string; color: string }> = {
  frozen: { bg: "rgba(59, 130, 246, 0.12)", color: "#3B82F6" },
  inDevelopment: { bg: "rgba(245, 158, 11, 0.12)", color: "#F59E0B" },
  completed: { bg: "rgba(52, 199, 89, 0.12)", color: "#22C55E" },
  prize: { bg: "rgba(234, 179, 8, 0.12)", color: "#EAB308" },
  earlyDev: { bg: "rgba(139, 92, 246, 0.12)", color: "#8B5CF6" },
  topSecret: { bg: "rgba(239, 68, 68, 0.12)", color: "#EF4444" },
  thinking: { bg: "rgba(107, 114, 128, 0.12)", color: "#6B7280" },
};

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  icon: Icon,
  status,
  pinned,
  github,
  link,
}: {
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: any;
  status: Record<string, any>;
  pinned?: boolean;
  github?: string;
  link?: string;
}) => {
  const { t } = useLang();
  const statusKey = getStatusKey(status);
  const badgeStyle = statusKey ? badgeColors[statusKey] : null;
  const badgeLabel = statusKey
    ? t.projects.badges[statusKey as keyof typeof t.projects.badges]
    : null;

  const isTankiTitle = title.toLowerCase().includes("tanki") || title.toLowerCase().includes("gtanks");

  return (
    <div className="glass-card rounded-3xl overflow-hidden group relative flex flex-col">
      {pinned && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 glass px-3 py-1 rounded-full">
          <Pin className="w-3 h-3 text-gray-700 dark:text-gray-300 fill-gray-700 dark:fill-gray-300" />
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{t.projects.pinned}</span>
        </div>
      )}

      {badgeStyle && badgeLabel && (
        <div
          className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: badgeStyle.bg, color: badgeStyle.color }}
        >
          {badgeLabel}
        </div>
      )}

      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: "var(--project-img-bg)" }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-28 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <HelpCircle className="h-20 w-20 text-gray-300 dark:text-gray-700 group-hover:scale-110 transition-transform duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/50 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-xl" style={{ background: "var(--icon-bg)" }}>
            <Icon className="w-4 h-4" style={{ color: "var(--tag-color)" }} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--tag-bg)",
                  color: "var(--tag-color)",
                  border: "1px solid var(--tag-border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {github && !isTankiTitle && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-medium"
            >
              <Github className="w-4 h-4" />
              {t.projects.code}
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {t.projects.site}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useLang();

  const allItems = t.projects.items;
  const pinnedItems = allItems.slice(0, 1);
  const regularItems = allItems.slice(1);
  const visibleRegular = showAll ? regularItems : regularItems.slice(0, 2);

  return (
    <section id="projects" aria-label="Портфолио и реализованные проекты" className="py-24 px-4 relative">
      <div className="aurora-orb w-[450px] h-[450px] bg-gray-200 dark:bg-zinc-800 top-[5%] left-[-8%] opacity-35 dark:opacity-10" />
      <div className="aurora-orb w-[400px] h-[400px] bg-slate-100 dark:bg-slate-900 bottom-[10%] right-[-5%] opacity-40 dark:opacity-10" style={{ animationDelay: "5s" }} />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.projects.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
            {t.projects.heading}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            {t.projects.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pinnedItems.map((item, i) => (
            <ProjectCard
              key={item.title}
              title={item.title}
              description={item.description}
              tags={item.tags}
              image={projectImages[i]}
              icon={projectIcons[i]}
              status={projectStatuses[i]}
              pinned={true}
              github={projectGithubs[i]}
              link={projectLinks[i]}
            />
          ))}
          {visibleRegular.map((item, i) => {
            const idx = i + 1;
            return (
              <ProjectCard
                key={item.title}
                title={item.title}
                description={item.description}
                tags={item.tags}
                image={projectImages[idx]}
                icon={projectIcons[idx]}
                status={projectStatuses[idx]}
                github={projectGithubs[idx]}
                link={projectLinks[idx]}
              />
            );
          })}
        </div>

        {regularItems.length > 2 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="ios-button-glass inline-flex items-center gap-2 px-7 py-3 text-sm"
            >
              {showAll ? (
                <>{t.projects.hide} <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>{t.projects.showAll} <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
