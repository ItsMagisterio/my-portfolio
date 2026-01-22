import { Github, MapPin, Code2, Send, Terminal, Brackets, Parentheses, CurlyBraces, ChevronDown } from "lucide-react";
import avatar from "@/assets/avatar.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-glow-secondary/10 rounded-full blur-3xl" />
      
      {/* Floating programming icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Terminal className="absolute top-[15%] left-[10%] w-12 h-12 text-primary animate-float" style={{ animationDelay: "0s" }} />
        <Code2 className="absolute top-[25%] right-[15%] w-16 h-16 text-primary animate-float" style={{ animationDelay: "1s" }} />
        <Brackets className="absolute bottom-[20%] left-[15%] w-14 h-14 text-primary animate-float" style={{ animationDelay: "2s" }} />
        <CurlyBraces className="absolute bottom-[30%] right-[10%] w-12 h-12 text-primary animate-float" style={{ animationDelay: "3s" }} />
        <Parentheses className="absolute top-[60%] right-[20%] w-10 h-10 text-primary animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      
      <div className="container max-w-4xl mx-auto text-center relative z-10">
        {/* Avatar */}
        <div className="mb-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-gradient p-1 animate-pulse-glow">
              <img 
                src={avatar} 
                alt="Богдан - magister1o"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-mono">
              17 лет
            </div>
          </div>
        </div>

        {/* Name and title */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-foreground">Привет, я </span>
            <span className="text-gradient">Богдан</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-mono">
            @magister1o
          </p>
          <p className="text-lg md:text-xl text-foreground/80 mb-6">
            Full-Stack Developer & Энтузиаст
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <MapPin className="w-5 h-5 text-primary" />
          <span>Брест, Беларусь</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <a 
            href="https://github.com/ItsMagisterio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform glow-primary"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a 
            href="https://t.me/magister1o"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#229ED9] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" />
            Telegram
          </a>
          <a 
            href="#projects"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors border border-border"
          >
            <Code2 className="w-5 h-5" />
            Мои проекты
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary opacity-70" />
      </div>
    </section>
  );
};

export default HeroSection;
