import { Github, Heart, Send } from "lucide-react";
import { SiTwitch, SiSteam, SiDiscord } from "react-icons/si";
import logoDark from "@/assets/logo-dark.jpg";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and name */}
          <div className="flex items-center gap-3">
            <img 
              src={logoDark} 
              alt="magister1o logo" 
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <p className="font-bold">magister1o</p>
              <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ItsMagisterio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
              data-testid="link-github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/magister1o"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
              data-testid="link-telegram"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="https://discord.com/users/magister1o"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
              data-testid="link-discord"
              title="Discord: magister1o"
            >
              <SiDiscord className="w-5 h-5" />
            </a>
            <a
              href="https://www.twitch.tv/magister1o"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
              data-testid="link-twitch"
            >
              <SiTwitch className="w-5 h-5" />
            </a>
            <a
              href="https://steamcommunity.com/id/magister1o/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
              data-testid="link-steam"
            >
              <SiSteam className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Сделано с <Heart className="w-4 h-4 text-primary" /> в Бресте, Беларусь
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © {new Date().getFullYear()} magister1o. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
