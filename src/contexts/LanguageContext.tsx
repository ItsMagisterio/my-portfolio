import { createContext, useContext, useState } from "react";

type Lang = "ru" | "en";

const translations = {
  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      projects: "Проекты",
      pcBusiness: "ПК Бизнес",
    },
    hero: {
      openTo: "Открыт к новым проектам",
      name: "Богдан",
      subtitle: "Middle Full-Stack Developer",
      tagline: "Проектирую и реализую сложные продукты с нуля.\nКоммерческие результаты — не обещания, а факты.",
      cta: "Обсудить проект",
      location: "Брест, Беларусь",
      stats: [
        { value: "4", label: "года опыта" },
        { value: "Middle", label: "Programmer" },
        { value: "Full", label: "Stack" },
      ],
    },
    about: {
      eyebrow: "О разработчике",
      heading: "Опыт, который говорит сам за себя",
      bio1: "Специализируюсь на полном цикле разработки — от архитектуры до production-деплоя. Работаю с коммерческими клиентами, строю масштабируемые системы и довожу проекты до результата.",
      bio2: "Дипломированный Java-разработчик (MyIT, Брест, 2022). Коммерческий опыт: сайты под ключ, SEO-оптимизация, игровые серверы, инструменты автоматизации.",
      bio2School: "MyIT, Брест, 2022",
      cards: [
        {
          title: "Архитектура решений",
          text: "Проектирую системы с нуля — выбираю правильный стек, выстраиваю структуру кода, которая не превращается в технический долг через полгода.",
        },
        {
          title: "Коммерческие проекты",
          text: "Реализованные заказы для бизнеса: корпоративные сайты, SEO-аудиты, системы автоматизации. Каждый проект — в срок и в рамках ТЗ.",
        },
        {
          title: "Full-Stack без компромиссов",
          text: "Backend, frontend, БД, деплой — всё в одних руках. Не передаю задачи на аутсорс, контролирую качество на каждом этапе.",
        },
      ],
    },
    skills: {
      eyebrow: "Технологический стек",
      heading: "Мои инструменты",
      subheading: "Широкий охват технологий — от системного программирования до современного веба",
      categories: ["Языки программирования", "Frontend", "Backend", "Базы данных", "IDE и инструменты разработки", "Дополнительные инструменты"],
    },
    projects: {
      eyebrow: "Портфолио",
      heading: "Реализованные работы",
      subheading: "Коммерческие проекты, собственные продукты и open-source разработки",
      pinned: "Закреплено",
      showAll: "Показать все",
      hide: "Скрыть",
      code: "Код",
      site: "Сайт",
      badges: {
        frozen: "Закрыт",
        inDevelopment: "В разработке",
        completed: "✓ Выполнено",
        earlyDev: "Ранняя стадия",
        topSecret: "TOP SECRET",
        thinking: "В размышлении",
        prize: "3 место из 54 работ в городе",
      },
      items: [
        {
          title: "Coming Soon",
          description: "Информация засекречена. Следите за обновлениями...",
          tags: [],
        },
        {
          title: "Katkova House",
          description: "Коммерческий сайт разработанный по заказу. Современный дизайн и полная функциональность для бизнеса.",
          tags: ["Коммерческий", "На заказ"],
        },
        {
          title: "Vivr",
          description: "Провёл полный SEO-аудит и оптимизацию сайта: настройка мета-тегов, структурированных данных, улучшение скорости и видимости в поисковых системах.",
          tags: ["SEO", "Оптимизация", "На заказ"],
        },
        {
          title: "Gtanks",
          description: "Новый амбициозный проект по воссозданию классического танкового геймплея на Java и ActionScript 3 (Flash Player).",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "FlashTanki",
          description: "Браузерная игра про танки, написанная на Java и ActionScript 3 (Flash Player). Мультиплеерный геймплей с реалистичной физикой.",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "ПСГЭК",
          description: "Сайт разработанный специально для конкурса «100 идей для Беларуси» в номинации по энергетике. Проект посвящён альтернативным источникам энергии.",
          tags: ["React", "Конкурс", "Энергетика"],
        },
        {
          title: "CyberTankz",
          description: "Браузерная танковая игра — аналог Танков Онлайн, написанная на Java и ActionScript 3. Был одним из ведущих разработчиков.",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "Tanki X",
          description: "Продолжение легендарных Танков Онлайн с современной 3D-графикой и улучшенной физикой. Пишется на C# и Unity.",
          tags: ["C#", "Unity", "3D"],
        },
        {
          title: "CS:GO GS",
          description: "Инструмент на C++, эмулирующий Game Coordinator сервера CS:GO. Позволяет запускать игру с кастомной логикой и инвентарём.",
          tags: ["C++", "CS:GO", "Эмулятор", "Fork / Доработка"],
        },
        {
          title: "Kufar Cheker",
          description: "Веб-сервис для умного шопинга на Kufar.by: помогает отсеивать перекупщиков и находить аналоги товаров по более низкой цене.",
          tags: ["React", "Парсинг", "Беларусь"],
        },
      ],
    },
    footer: {
      role: "Middle Full-Stack Developer",
      location: "Брест, Беларусь",
    },
  },

  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      pcBusiness: "PC Business",
    },
    hero: {
      openTo: "Open to new projects",
      name: "Bogdan",
      subtitle: "Middle Full-Stack Developer",
      tagline: "I design and build complex products from scratch.\nCommercial results — not promises, but facts.",
      cta: "Discuss a project",
      location: "Brest, Belarus",
      stats: [
        { value: "4", label: "years of exp." },
        { value: "Middle", label: "Programmer" },
        { value: "Full", label: "Stack" },
      ],
    },
    about: {
      eyebrow: "About the Developer",
      heading: "Experience that speaks for itself",
      bio1: "I specialize in the full development cycle — from architecture to production deployment. I work with commercial clients, build scalable systems, and deliver projects to completion.",
      bio2: "Certified Java developer (MyIT, Brest, 2022). Commercial experience: turnkey websites, SEO optimization, game servers, automation tools.",
      bio2School: "MyIT, Brest, 2022",
      cards: [
        {
          title: "Solution Architecture",
          text: "I design systems from scratch — choosing the right stack, building code structure that doesn't turn into technical debt in six months.",
        },
        {
          title: "Commercial Projects",
          text: "Completed business orders: corporate websites, SEO audits, automation systems. Every project — on time and within scope.",
        },
        {
          title: "Full-Stack Without Compromise",
          text: "Backend, frontend, DB, deployment — all in one pair of hands. I don't outsource tasks, I control quality at every stage.",
        },
      ],
    },
    skills: {
      eyebrow: "Technology Stack",
      heading: "My Tools",
      subheading: "Wide technology coverage — from systems programming to modern web",
      categories: ["Programming Languages", "Frontend", "Backend", "Databases", "IDE & Dev Tools", "Additional Tools"],
    },
    projects: {
      eyebrow: "Portfolio",
      heading: "Completed Work",
      subheading: "Commercial projects, personal products, and open-source development",
      pinned: "Pinned",
      showAll: "Show all",
      hide: "Hide",
      code: "Code",
      site: "Site",
      badges: {
        frozen: "Closed",
        inDevelopment: "In Development",
        completed: "✓ Completed",
        earlyDev: "Early Stage",
        topSecret: "TOP SECRET",
        thinking: "Thinking",
        prize: "3rd place out of 54 works in the city",
      },
      items: [
        {
          title: "Coming Soon",
          description: "Information is classified. Stay tuned for updates...",
          tags: [],
        },
        {
          title: "Katkova House",
          description: "A commercial website built to order. Modern design and full functionality for business.",
          tags: ["Commercial", "Custom"],
        },
        {
          title: "Vivr",
          description: "Performed a full SEO audit and website optimization: meta tag setup, structured data, improved speed and search engine visibility.",
          tags: ["SEO", "Optimization", "Custom"],
        },
        {
          title: "Gtanks",
          description: "A new ambitious project to recreate classic tank gameplay in Java and ActionScript 3 (Flash Player).",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "FlashTanki",
          description: "A browser tank game written in Java and ActionScript 3 (Flash Player). Multiplayer gameplay with realistic physics.",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "PSGEK",
          description: "A website developed specifically for the '100 Ideas for Belarus' competition in the energy category. Dedicated to alternative energy sources.",
          tags: ["React", "Competition", "Energy"],
        },
        {
          title: "CyberTankz",
          description: "A browser tank game — an analogue of Tanki Online, written in Java and ActionScript 3. I was one of the lead developers.",
          tags: ["Java", "AS3", "Flash Player"],
        },
        {
          title: "Tanki X",
          description: "A continuation of the legendary Tanki Online with modern 3D graphics and improved physics. Built with C# and Unity.",
          tags: ["C#", "Unity", "3D"],
        },
        {
          title: "CS:GO GS",
          description: "A C++ tool emulating the CS:GO Game Coordinator server. Allows launching the game with custom logic and inventory.",
          tags: ["C++", "CS:GO", "Emulator", "Fork / Modified"],
        },
        {
          title: "Kufar Cheker",
          description: "A web service for smart shopping on Kufar.by: helps filter out resellers and find product alternatives at lower prices.",
          tags: ["React", "Parsing", "Belarus"],
        },
      ],
    },
    footer: {
      role: "Middle Full-Stack Developer",
      location: "Brest, Belarus",
    },
  },
};

type Translations = typeof translations.ru;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
