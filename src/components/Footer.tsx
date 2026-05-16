import { Github, Send } from "lucide-react";
import { SiTwitch, SiSteam, SiDiscord, SiLinkedin } from "react-icons/si";
import logoDark from "@/assets/logo-dark.jpg";
import { useLang } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="glass-lg rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo and name */}
            <div className="flex items-center gap-3">
              <img src={logoDark} alt="magister1o logo" className="w-10 h-10 rounded-2xl" />
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">magister1o</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.footer.role}</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {[
                { href: "https://github.com/ItsMagisterio", icon: Github, label: "GitHub", testId: "link-github" },
                { href: "https://t.me/magister1o", icon: Send, label: "Telegram", testId: "link-telegram" },
                { href: "https://discord.com/users/magister1o", icon: SiDiscord, label: "Discord", testId: "link-discord" },
                { href: "https://www.linkedin.com/in/bogdan-vauranchuk-50a642400/", icon: SiLinkedin, label: "LinkedIn", testId: "link-linkedin", disabled: true },
                { href: "https://www.twitch.tv/magister1o", icon: SiTwitch, label: "Twitch", testId: "link-twitch" },
                { href: "https://steamcommunity.com/id/magister1o/", icon: SiSteam, label: "Steam", testId: "link-steam" },
              ].map(({ href, icon: Icon, label, testId, disabled }) => (
                <a
                  key={testId}
                  href={disabled ? undefined : href}
                  target={disabled ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={label}
                  data-testid={testId}
                  className={disabled
                    ? "p-2.5 rounded-2xl text-gray-300 dark:text-gray-600 cursor-not-allowed transition-all duration-200"
                    : "p-2.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:bg-white/60 dark:hover:bg-white/10"
                  }
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/50 dark:border-white/10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              magister1o · {t.footer.role} · {t.footer.location}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              © {new Date().getFullYear()} magister1o. All rights reserved.
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <a
                href="/terms"
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline underline-offset-2"
              >
                {t.footer.terms}
              </a>
              <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
              <a
                href="/copyright"
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline underline-offset-2"
              >
                {t.footer.copyright}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
