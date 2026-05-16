import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const link = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
    {label}
  </a>
);

type Section = { heading: string; body: React.ReactNode };

const CopyrightPolicy = () => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const isRu = lang === "ru";

  const intro = isRu ? (
    <>
      Находясь на данном сайте, расположенном по адресу{" "}
      {link("https://magister1o-portfolio.vercel.app", "magister1o-portfolio.vercel.app")},
      пользователь автоматически соглашается с настоящими условиями использования и подтверждает, что ему известно о наличии авторских прав на все материалы и элементы сайта.
    </>
  ) : (
    <>
      By being on this website located at{" "}
      {link("https://magister1o-portfolio.vercel.app", "magister1o-portfolio.vercel.app")},
      the user automatically agrees to these terms of use and confirms that they are aware of the existence of copyright on all materials and elements of the website.
    </>
  );

  const sections: Section[] = isRu ? [
    {
      heading: "Исходный код",
      body: <>
        Исходный код проекта размещён в открытом доступе на платформе {link("https://github.com", "GitHub")} по ссылке:{" "}
        {link("https://github.com/ItsMagisterio/my-portfolio", "ItsMagisterio/my-portfolio")}<br /><br />
        Открытый доступ к исходному коду предоставлен исключительно в ознакомительных и образовательных целях и не означает разрешение на копирование, распространение, модификацию, повторное использование или публикацию проекта либо его отдельных частей.<br /><br />
        Полное или частичное копирование сайта строго запрещено.
      </>,
    },
    {
      heading: "Запрещённые действия",
      body: <>
        Запрещается любое использование без письменного разрешения автора, включая, но не ограничиваясь:<br />
        — копированием дизайна сайта;<br />
        — копированием структуры и расположения блоков;<br />
        — копированием HTML/CSS/JavaScript/TypeScript кода;<br />
        — копированием компонентов интерфейса;<br />
        — копированием анимаций, эффектов и визуального оформления;<br />
        — копированием текстов, описаний и контента;<br />
        — копированием изображений, иконок, логотипов и графики;<br />
        — использованием сайта как шаблона, основы или референса для собственного портфолио;<br />
        — публикацией изменённых или частично изменённых копий проекта;<br />
        — выдачей проекта либо его частей за собственную работу;<br />
        — удалением или изменением информации об авторстве.
      </>,
    },
    {
      heading: "Правовая защита",
      body: <>
        Все элементы сайта являются результатом интеллектуальной деятельности автора и охраняются Законом Республики Беларусь «Об авторском праве и смежных правах». Авторское право возникает автоматически с момента создания проекта и не требует регистрации, оформления ИП, патента или иных государственных документов.<br /><br />
        Любое обнаруженное копирование проекта, даже частичное, может рассматриваться как нарушение исключительных авторских прав.
      </>,
    },
    {
      heading: "Меры при нарушении",
      body: <>
        В случае нарушения автор вправе:<br />
        — потребовать немедленное удаление скопированного контента;<br />
        — направить жалобу хостинг-провайдеру и регистратору домена;<br />
        — направить жалобы в {link("https://vercel.com", "Vercel")}, {link("https://github.com", "GitHub")}, CDN-сервисы, поисковые системы и иные платформы;<br />
        — потребовать ограничение доступа к ресурсу-нарушителю;<br />
        — использовать историю Git-коммитов, дату публикации репозитория, историю деплоев, исходные файлы и иные цифровые доказательства для подтверждения авторства;<br />
        — обратиться за защитой исключительных прав в соответствии с законодательством Республики Беларусь и международными нормами в сфере интеллектуальной собственности.
      </>,
    },
  ] : [
    {
      heading: "Source Code",
      body: <>
        The project's source code is publicly available on {link("https://github.com", "GitHub")}:{" "}
        {link("https://github.com/ItsMagisterio/my-portfolio", "ItsMagisterio/my-portfolio")}<br /><br />
        Public access to the source code is provided exclusively for informational and educational purposes and does not imply permission to copy, distribute, modify, reuse or publish the project or its individual parts.<br /><br />
        Full or partial copying of the website is strictly prohibited.
      </>,
    },
    {
      heading: "Prohibited Actions",
      body: <>
        Any use without the written permission of the author is prohibited, including but not limited to:<br />
        — copying the website design;<br />
        — copying the structure and layout of blocks;<br />
        — copying HTML/CSS/JavaScript/TypeScript code;<br />
        — copying interface components;<br />
        — copying animations, effects and visual design;<br />
        — copying texts, descriptions and content;<br />
        — copying images, icons, logos and graphics;<br />
        — using the website as a template, basis or reference for one's own portfolio;<br />
        — publishing modified or partially modified copies of the project;<br />
        — presenting the project or its parts as one's own work;<br />
        — removing or modifying authorship information.
      </>,
    },
    {
      heading: "Legal Protection",
      body: <>
        All elements of the website are the result of the author's intellectual activity and are protected by the Law of the Republic of Belarus "On Copyright and Related Rights". Copyright arises automatically from the moment the project is created and does not require registration, business incorporation, patent or any other government documents.<br /><br />
        Any discovered copying of the project, even partial, may be considered a violation of exclusive copyright.
      </>,
    },
    {
      heading: "Enforcement Actions",
      body: <>
        In case of violation, the author has the right to:<br />
        — demand immediate removal of copied content;<br />
        — file a complaint with the hosting provider and domain registrar;<br />
        — file complaints with {link("https://vercel.com", "Vercel")}, {link("https://github.com", "GitHub")}, CDN services, search engines and other platforms;<br />
        — demand restriction of access to the infringing resource;<br />
        — use Git commit history, repository publication date, deployment history, source files and other digital evidence to confirm authorship;<br />
        — seek protection of exclusive rights in accordance with the laws of the Republic of Belarus and international intellectual property norms.
      </>,
    },
  ];

  const outro = isRu
    ? "Продолжая использование сайта, пользователь подтверждает полное согласие с настоящими условиями."
    : "By continuing to use the website, the user confirms full agreement with these terms.";

  return (
    <main className="min-h-screen px-4 py-24 relative overflow-hidden bg-background">
      <div className="aurora-orb w-[500px] h-[500px] bg-gray-200 dark:bg-zinc-800 top-[-10%] left-[-10%] opacity-40 dark:opacity-10" />
      <div className="container max-w-3xl mx-auto relative z-10">
        <button
          type="button"
          aria-label={isRu ? "Вернуться на предыдущую страницу" : "Return to the previous page"}
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {isRu ? "Назад" : "Back"}
        </button>

        <article className="glass-lg rounded-3xl p-8 md:p-12">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            {isRu ? "Последнее обновление: 14 мая 2026 года" : "Last updated: May 14, 2026"}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {isRu ? "Политика авторских прав" : "Copyright Policy"}
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
        </article>
      </div>
    </main>
  );
};

export default CopyrightPolicy;
