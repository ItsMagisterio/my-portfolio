import { Sparkles, Target, Heart, Code2 } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Обо <span className="text-gradient">мне</span>
          </h2>
        </div>

        <div className="liquid-glass rounded-2xl p-8 md:p-12 card-shadow">
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            Привет! Меня зовут <span className="text-primary font-semibold">Богдан</span>, мне 17 лет и я из Бреста, Беларусь. 
            Я увлечённый full-stack разработчик, который на данный момент работает фрилансером и создаёт современные сайты на заказ.
          </p>
          
          <div className="flex items-start gap-4 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-primary mb-1">Образование</h3>
              <p className="text-sm md:text-base">
                Дипломированный программист. В 2022 году окончил обучение в <span className="font-bold">MyIT (Брест)</span> по специальности <span className="font-bold">Java-разработчик</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Энтузиазм</h3>
                <p className="text-sm text-muted-foreground">
                  Постоянно учусь и экспериментирую с новыми технологиями
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Цели</h3>
                <p className="text-sm text-muted-foreground">
                  Стремлюсь стать профессиональным разработчиком
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Увлечения</h3>
                <p className="text-sm text-muted-foreground">
                  Разработка игр, веб-приложения, open-source
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
