import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const text = {
    ru: {
      code: "404",
      title: "Страница не найдена",
      desc: "Похоже, эта страница не существует или была перемещена.",
      back: "Назад",
      home: "На главную",
    },
    en: {
      code: "404",
      title: "Page not found",
      desc: "This page doesn't exist or has been moved.",
      back: "Go back",
      home: "Home",
    },
  }[lang];

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-background">
      <div className="aurora-orb w-[600px] h-[600px] bg-gray-200 dark:bg-zinc-800 top-[-20%] left-[-20%] opacity-50 dark:opacity-15" />
      <div className="aurora-orb w-[400px] h-[400px] bg-slate-200 dark:bg-slate-800 bottom-[-10%] right-[-10%] opacity-35 dark:opacity-10" style={{ animationDelay: "5s" }} />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="glass-lg rounded-3xl p-10 flex flex-col items-center gap-6">
          <div className="text-[7rem] font-extrabold leading-none tracking-tighter text-gray-900 dark:text-gray-100 select-none">
            {text.code}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {text.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {text.desc}
            </p>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg break-all">
            {location.pathname}
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              aria-label={text.back}
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:bg-white/60 dark:hover:bg-white/10 border border-black/10 dark:border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              {text.back}
            </button>
            <button
              type="button"
              aria-label={text.home}
              onClick={() => navigate("/")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-sm font-medium bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              {text.home}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
