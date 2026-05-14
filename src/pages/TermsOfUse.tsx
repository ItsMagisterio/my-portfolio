import Seo from "@/components/Seo";
import { defaultAlternates, localizedPath } from "@/lib/seo";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import seoData from "@/lib/seo-data.json";

const link = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
    {label}
  </a>
);

type Section = { heading: string; body: React.ReactNode };

const TermsOfUse = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const isRu = lang === "ru";
  const pageSeo = seoData.pages.terms[lang];

  const intro = isRu ? (
    <>
      Добро пожаловать на сайт {link("https://magister1o-portfolio.vercel.app", "magister1o-portfolio.vercel.app")}.<br /><br />
      Используя данный сайт, пользователь автоматически подтверждает согласие с настоящими условиями использования. Если пользователь не согласен с указанными условиями, он обязан прекратить использование сайта.
    </>
  ) : (
    <>
      Welcome to {link("https://magister1o-portfolio.vercel.app", "magister1o-portfolio.vercel.app")}.<br /><br />
      By using this website, the user automatically confirms agreement with these Terms of Use. If the user does not agree with these terms, they must stop using the website.
    </>
  );

  const sections: Section[] = isRu ? [
    {
      heading: "1. Общие положения",
      body: <>
        Данный сайт является авторским портфолио-проектом.<br /><br />
        Все материалы, размещённые на сайте, включая дизайн, структуру интерфейса, программный код, анимации, тексты, изображения, графические элементы, логотипы, иконки, эффекты и иные компоненты, являются объектами авторского права и охраняются законодательством Республики Беларусь и международными нормами в сфере интеллектуальной собственности.<br /><br />
        Исходный код проекта размещён в открытом доступе на платформе {link("https://github.com", "GitHub")}:{" "}
        {link("https://github.com/ItsMagisterio/my-portfolio", "ItsMagisterio/my-portfolio")}<br /><br />
        Публикация исходного кода в открытом доступе не означает передачу авторских прав или предоставление разрешения на свободное использование проекта.
      </>,
    },
    {
      heading: "2. Авторские права",
      body: <>
        Авторское право на сайт возникает автоматически с момента создания проекта и не требует регистрации, оформления ИП, патента или иных государственных документов.<br /><br />
        Автору принадлежат исключительные права на:<br />
        — дизайн сайта;<br />
        — структуру и компоновку интерфейса;<br />
        — HTML/CSS/JavaScript/TypeScript код;<br />
        — пользовательские компоненты;<br />
        — анимации и визуальные эффекты;<br />
        — тексты и описания;<br />
        — изображения и графические элементы;<br />
        — логотипы, иконки и фирменный стиль;<br />
        — иные результаты интеллектуальной деятельности, размещённые на сайте.
      </>,
    },
    {
      heading: "3. Запрещённые действия",
      body: <>
        Без письменного разрешения автора пользователю запрещается:<br /><br />
        — полностью или частично копировать сайт;<br />
        — использовать дизайн сайта в качестве шаблона или основы;<br />
        — копировать структуру страниц и расположение блоков;<br />
        — копировать, распространять или изменять исходный код;<br />
        — копировать анимации, эффекты и элементы интерфейса;<br />
        — использовать материалы сайта в коммерческих целях;<br />
        — публиковать изменённые версии проекта;<br />
        — выдавать проект либо его части за собственную работу;<br />
        — удалять или скрывать информацию об авторстве;<br />
        — использовать сайт или его элементы для создания собственного портфолио.<br /><br />
        Любое частичное или полное копирование проекта может рассматриваться как нарушение исключительных авторских прав.
      </>,
    },
    {
      heading: "4. Разрешённое использование",
      body: <>
        Пользователю разрешается:<br /><br />
        — просматривать содержимое сайта;<br />
        — изучать технологии, использованные в проекте;<br />
        — использовать сайт как источник вдохновения без прямого копирования реализации;<br />
        — просматривать исходный код исключительно в ознакомительных и образовательных целях.
      </>,
    },
    {
      heading: "5. Ответственность за нарушение",
      body: <>
        В случае нарушения настоящих условий автор вправе:<br /><br />
        — потребовать удаление скопированного контента;<br />
        — направить жалобы хостинг-провайдерам и регистраторам доменов;<br />
        — направить жалобы в {link("https://vercel.com", "Vercel")}, {link("https://github.com", "GitHub")}, CDN-сервисы, поисковые системы и иные платформы;<br />
        — потребовать ограничение доступа к ресурсу-нарушителю;<br />
        — использовать историю Git-коммитов, историю деплоев, дату публикации репозитория и иные цифровые доказательства для подтверждения авторства;<br />
        — обратиться за защитой исключительных прав в порядке, предусмотренном законодательством Республики Беларусь.
      </>,
    },
    {
      heading: "6. Ограничение ответственности",
      body: <>
        Автор не несёт ответственности за:<br />
        — возможные ошибки или временную недоступность сайта;<br />
        — действия третьих лиц;<br />
        — убытки, возникшие в результате использования сайта;<br />
        — содержимое сторонних ресурсов, ссылки на которые могут размещаться на сайте.
      </>,
    },
    {
      heading: "7. Изменение условий",
      body: "Автор вправе в любое время изменять или дополнять настоящие условия без предварительного уведомления пользователей. Актуальная версия условий публикуется на данной странице.",
    },
    {
      heading: "8. Контактная информация",
      body: "По вопросам использования материалов сайта и получения разрешений на использование контента пользователь может связаться с автором через контакты, указанные на сайте.",
    },
  ] : [
    {
      heading: "1. General Provisions",
      body: <>
        This website is an original portfolio project.<br /><br />
        All materials published on the website, including design, interface structure, source code, animations, texts, images, graphic elements, logos, icons, effects and other components, are subject to copyright and are protected by the laws of the Republic of Belarus and international intellectual property norms.<br /><br />
        The project's source code is publicly available on {link("https://github.com", "GitHub")}:{" "}
        {link("https://github.com/ItsMagisterio/my-portfolio", "ItsMagisterio/my-portfolio")}<br /><br />
        Publishing the source code publicly does not imply transfer of copyright or permission to freely use the project.
      </>,
    },
    {
      heading: "2. Copyright",
      body: <>
        Copyright on the website arises automatically from the moment the project is created and does not require registration, business incorporation, patent or any other government documents.<br /><br />
        The author holds exclusive rights to:<br />
        — website design;<br />
        — interface structure and layout;<br />
        — HTML/CSS/JavaScript/TypeScript code;<br />
        — custom components;<br />
        — animations and visual effects;<br />
        — texts and descriptions;<br />
        — images and graphic elements;<br />
        — logos, icons and brand identity;<br />
        — other results of intellectual activity published on the website.
      </>,
    },
    {
      heading: "3. Prohibited Actions",
      body: <>
        Without the written permission of the author, the user is prohibited from:<br /><br />
        — fully or partially copying the website;<br />
        — using the website design as a template or basis;<br />
        — copying the page structure and block layout;<br />
        — copying, distributing or modifying the source code;<br />
        — copying animations, effects and interface elements;<br />
        — using website materials for commercial purposes;<br />
        — publishing modified versions of the project;<br />
        — presenting the project or its parts as one's own work;<br />
        — removing or hiding authorship information;<br />
        — using the website or its elements to create their own portfolio.<br /><br />
        Any partial or complete copying of the project may be considered a violation of exclusive copyright.
      </>,
    },
    {
      heading: "4. Permitted Use",
      body: <>
        The user is permitted to:<br /><br />
        — view the website content;<br />
        — study the technologies used in the project;<br />
        — use the website as a source of inspiration without directly copying the implementation;<br />
        — view the source code exclusively for informational and educational purposes.
      </>,
    },
    {
      heading: "5. Liability for Violation",
      body: <>
        In case of violation of these terms, the author has the right to:<br /><br />
        — demand removal of copied content;<br />
        — file complaints with hosting providers and domain registrars;<br />
        — file complaints with {link("https://vercel.com", "Vercel")}, {link("https://github.com", "GitHub")}, CDN services, search engines and other platforms;<br />
        — demand restriction of access to the infringing resource;<br />
        — use Git commit history, deployment history, repository publication date and other digital evidence to confirm authorship;<br />
        — seek protection of exclusive rights under the laws of the Republic of Belarus.
      </>,
    },
    {
      heading: "6. Limitation of Liability",
      body: <>
        The author is not responsible for:<br />
        — possible errors or temporary unavailability of the website;<br />
        — actions of third parties;<br />
        — losses arising from the use of the website;<br />
        — content of third-party resources that may be linked on the website.
      </>,
    },
    {
      heading: "7. Changes to Terms",
      body: "The author reserves the right to modify or supplement these terms at any time without prior notice to users. The current version of the terms is published on this page.",
    },
    {
      heading: "8. Contact Information",
      body: "For questions regarding the use of website materials and obtaining permission to use content, the user may contact the author through the contacts provided on the website.",
    },
  ];

  const outro = isRu
    ? "Продолжая использование сайта, пользователь подтверждает, что ознакомился с настоящими условиями и обязуется соблюдать их."
    : "By continuing to use the website, the user confirms that they have read these terms and agrees to comply with them.";

  return (
    <>
      <Seo
        lang={lang}
        title={pageSeo.title}
        description={pageSeo.description}
        canonicalPath={localizedPath(lang, "/terms")}
        robots="noindex, follow"
        alternates={defaultAlternates("/terms")}
      />
    <div className="min-h-screen px-4 py-24 relative overflow-hidden bg-background">
      <div className="aurora-orb w-[500px] h-[500px] bg-gray-200 dark:bg-zinc-800 top-[-10%] right-[-10%] opacity-40 dark:opacity-10" />
      <div className="container max-w-3xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isRu ? "Назад" : "Back"}
        </button>

        <div className="glass-lg rounded-3xl p-8 md:p-12">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            {isRu ? "Последнее обновление: 14 мая 2026 года" : "Last updated: May 14, 2026"}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {isRu ? "Условия использования сайта" : "Terms of Use"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-10">{intro}</p>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.heading} className="border-t border-white/30 dark:border-white/10 pt-6">
                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">{s.heading}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-white/30 dark:border-white/10">
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">{outro}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TermsOfUse;
