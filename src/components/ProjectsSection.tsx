import { useState } from "react";
import { ExternalLink, Github, Gamepad2, Zap, Home, ChevronDown, ChevronUp, HelpCircle, Cpu, type LucideIcon } from "lucide-react";
import shina24Logo from "@/assets/shina24-logo.png";
import kondeyLogo from "@/assets/kondey-logo.png";
import flashtankiLogo from "@/assets/flashtanki-logo.png";
import psgekLogo from "@/assets/psgek-logo.png";
import katkovaLogo from "@/assets/katkova-logo.png";
import gtanksLogo from "@/assets/gtanks-logo.png";
import cybertankzLogo from "@/assets/cybertankz-logo.png";
import tankixLogo from "@/assets/tankix-logo.png";
import csgoGsLogo from "@/assets/csgo-gs-logo.png";
import { useLang } from "@/contexts/LanguageContext";

const projectImages = [
  katkovaLogo,
  gtanksLogo,
  flashtankiLogo,
  psgekLogo,
  cybertankzLogo,
  tankixLogo,
  csgoGsLogo,
];

const projectIcons = [Home, Gamepad2, Gamepad2, Zap, Gamepad2, Gamepad2, Cpu];

const projectLinks: (string | undefined)[] = [
  "https://katkova-house.ru/",
  undefined,
  undefined,
  "https://psgek.belarus.by/",
  undefined,
  undefined,
  undefined,
];

const projectGithubs: (string | undefined)[] = [
  undefined,
  "https://github.com/ItsMagisterio",
  "https://github.com/ItsMagisterio",
  undefined,
  undefined,
  undefined,
  "https://github.com/ItsMagisterio",
];

const projectStatuses = [
  { completed: true },
  { frozen: true },
  { frozen: true },
  { prize: "3 место из 54 работ в городе" },
  { frozen: true },
  { frozen: true },
  { inDevelopment: true },
];

type ProjectStatus = Record<string, boolean | string | undefined>;

const getStatusKey = (status: ProjectStatus): string | null => {
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
  className,
  style,
}: {
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: LucideIcon;
  status: ProjectStatus;
  pinned?: boolean;
  github?: string;
  link?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { t } = useLang();
  const statusKey = getStatusKey(status);
  const badgeStyle = statusKey ? badgeColors[statusKey] : null;
  const badgeLabel = statusKey
    ? t.projects.badges[statusKey as keyof typeof t.projects.badges]
    : null;

  const isTankiTitle = title.toLowerCase().includes("tanki") || title.toLowerCase().includes("gtanks");

  return (
    <article className={`glass-card rounded-3xl overflow-hidden group relative flex flex-col${className ? ` ${className}` : ""}`} style={style}>
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
            alt={`Логотип проекта ${title}`}
            loading="lazy"
            decoding="async"
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

        <div className="flex gap-4 mb-4">
          {github && !isTankiTitle && (
            <a
              href={github}
              aria-label={`Открыть исходный код проекта ${title} на GitHub`}
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
              aria-label={`Открыть сайт проекта ${title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {t.projects.site}
            </a>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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
      </div>
    </article>
  );
};

const pairedImages: Record<string, string> = {
  shina24: shina24Logo,
  kondey: kondeyLogo,
};

const STACK_PREVIEW = 4;

const PairedProjectCard = () => {
  const { t } = useLang();
  const { projects, techStack, seoLabel, seoWork } = t.projects.pairedItem;
  const [stackExpanded, setStackExpanded] = useState(false);
  const visibleStack = stackExpanded ? techStack : techStack.slice(0, STACK_PREVIEW);
  const SEO_PREVIEW = 2;
  const [seoExpanded, setSeoExpanded] = useState(false);
  const visibleSeo = seoExpanded ? seoWork : seoWork.slice(0, SEO_PREVIEW);

  return (
    <article className="glass-card rounded-3xl overflow-hidden col-span-1 md:col-span-2 flex flex-col">
      {/* Top: two project halves side by side */}
      <div className="flex flex-col sm:flex-row">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`group flex-1 flex flex-col ${i === 0 ? "border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-zinc-800" : ""}`}
          >
            <div
              className="relative h-44 flex items-center justify-center overflow-hidden"
              style={{ background: "var(--project-img-bg)" }}
            >
              <img
                src={pairedImages[project.title]}
                alt={`Логотип проекта ${project.name}`}
                loading="lazy"
                decoding="async"
                className="h-24 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(52, 199, 89, 0.12)", color: "#22C55E" }}
              >
                {t.projects.badges.completed}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/50 to-transparent" />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-xl" style={{ background: "var(--icon-bg)" }}>
                  <Home className="w-4 h-4" style={{ color: "var(--tag-color)" }} />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">{project.name}</h3>
              </div>

              <div className="flex-1" />

              <a
                href={project.link}
                aria-label={`Открыть сайт проекта ${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-medium mb-3"
              >
                <ExternalLink className="w-4 h-4" />
                {t.projects.site}
              </a>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "var(--tag-bg)", color: "var(--tag-color)", border: "1px solid var(--tag-border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack inline */}
      <div className="border-t border-gray-200 dark:border-zinc-800 px-5 py-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {visibleStack.map((row) => (
          <span key={row.cat} className="text-xs text-gray-500 dark:text-gray-400">
            <span className="text-gray-400 dark:text-gray-600">{row.cat}:</span>{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">{row.tech}</span>
          </span>
        ))}
        {techStack.length > STACK_PREVIEW && (
          <button
            type="button"
            aria-expanded={stackExpanded}
            aria-label={stackExpanded ? "Свернуть стек технологий" : "Показать весь стек технологий"}
            onClick={() => setStackExpanded(!stackExpanded)}
            className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {stackExpanded ? (
              <><ChevronUp className="w-3 h-3" /> {t.projects.collapse}</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> +{techStack.length - STACK_PREVIEW}</>
            )}
          </button>
        )}
      </div>

      {/* SEO work inline */}
      <div className="border-t border-gray-200 dark:border-zinc-800 px-5 py-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mr-1">{seoLabel}:</span>
        {visibleSeo.map((item, i) => (
          <span key={item} className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600 dark:text-gray-400">{item}</span>
            {i < visibleSeo.length - 1 && <span className="text-gray-300 dark:text-zinc-700">·</span>}
          </span>
        ))}
        {seoWork.length > SEO_PREVIEW && (
          <button
            type="button"
            aria-expanded={seoExpanded}
            aria-label={seoExpanded ? "Свернуть SEO-работы" : "Показать все SEO-работы"}
            onClick={() => setSeoExpanded(!seoExpanded)}
            className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ml-0.5"
          >
            {seoExpanded ? (
              <><ChevronUp className="w-3 h-3" /> {t.projects.collapse}</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> +{seoWork.length - SEO_PREVIEW}</>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const { t } = useLang();

  const allItems = t.projects.items;
  const pinnedItems = allItems.slice(0, 1);
  const regularItems = allItems.slice(1);
  const visibleRegular = (showAll || isClosing) ? regularItems : regularItems.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      setButtonVisible(false);
      setIsClosing(true);
      setShowAll(false);
      const extraCount = regularItems.length - 3;
      const delay = 400 + extraCount * 60;
      setTimeout(() => {
        setIsClosing(false);
        setTimeout(() => setButtonVisible(true), 60);
      }, delay);
    } else {
      setButtonVisible(false);
      setShowAll(true);
      setTimeout(() => setButtonVisible(true), 60);
    }
  };

  return (
    <section id="projects" aria-label="Портфолио и реализованные проекты" className="py-24 px-4 relative content-auto">
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
          <PairedProjectCard />
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
            const isNew = showAll && i >= 3;
            const isLeaving = isClosing && i >= 3;
            const extraIdx = i - 3;
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
                className={isLeaving ? "card-disappear" : isNew ? "card-appear" : undefined}
                style={
                  isLeaving || isNew
                    ? { animationDelay: `${extraIdx * 60}ms` }
                    : undefined
                }
              />
            );
          })}
        </div>

        {regularItems.length > 2 && (
          <div
            className="mt-12 text-center transition-opacity duration-200"
            style={{ opacity: buttonVisible ? 1 : 0, pointerEvents: buttonVisible ? "auto" : "none" }}
          >
            <button
              type="button"
              aria-expanded={showAll}
              aria-label={showAll ? "Скрыть дополнительные проекты" : "Показать все проекты"}
              onClick={handleToggle}
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
