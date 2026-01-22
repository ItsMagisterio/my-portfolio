import { Cpu, TrendingUp, Monitor, HardDrive, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PcBusinessPage = () => {
  const gpuHistory = [
    { model: "GTX 970", count: 1 },
    { model: "GTX 1070", count: 1 },
    { model: "RX 580", count: 3 },
    { model: "RX 590 GME", count: 1 },
    { model: "RX 590", count: 1 },
    { model: "GTX 1080 Ti", count: 2 },
    { model: "RX 6600 XT", count: 1 },
    { model: "RTX 3050", count: 1 },
    { model: "RTX 2060 Super", count: 1 },
    { model: "RTX 2070", count: 1 },
  ];

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>

        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Сборка и <span className="text-gradient">Перепродажа</span> ПК
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Увлекаюсь сборкой компьютеров, продажей комплектующих и профессиональной перепродажей видеокарт.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="liquid-glass rounded-2xl p-8 card-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Путь к RTX 2070 (пример)</h2>
            </div>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Начал свой путь в перепродаже всего с <span className="text-primary font-bold">50 BYN</span>. 
              Благодаря анализу рынка и успешным сделкам, я дошел до <span className="text-primary font-bold">RTX 2070</span> без каких-либо дополнительных вложений.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-8 card-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Моя специализация</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Сборка и продажа игровых и офисных ПК</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Продажа комплектующих (ОЗУ, видеокарты и др.)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Готовые комплекты (материнская плата + процессор + охлад + ОЗУ)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Прикладная ПК-инженерия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-8 md:p-12 card-shadow mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <HardDrive className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">История перепроданных видеокарт</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gpuHistory.map((gpu, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 group hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-mono">{gpu.model}</span>
                </div>
                {gpu.count > 1 && (
                  <span className="text-xs font-bold px-2 py-1 bg-primary text-primary-foreground rounded-md">
                    {gpu.count} шт.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcBusinessPage;
