import { Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const dashboardCards = [
    {
      title: "Assistir Aulas",
      description: "Acesse nosso conteúdo educativo sobre finanças pessoais",
      icon: "📚",
      link: "/dashboard/aulas",
      variant: "hero" as const,
    },
    {
      title: "Fazer Simulação",
      description: "Pratique investimentos em um ambiente seguro",
      icon: "📊",
      link: "/dashboard/simulador", 
      variant: "success" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 px-4 pt-24 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Bem-vindo ao BabyStep$
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Continue sua jornada de educação financeira. Escolha uma das opções abaixo para começar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dashboardCards.map((card, index) => (
              <div key={index} className="bg-gradient-card rounded-2xl shadow-strong p-8 border border-border/50 text-center hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-6">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {card.description}
                </p>
                <Button asChild variant={card.variant} size="lg" className="w-full">
                  <Link to={card.link}>{card.title}</Link>
                </Button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-card rounded-xl p-6 shadow-medium border border-border/50 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                🚀 Seu Progresso
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Continue aprendendo para desbloquear novos conteúdos e funcionalidades
              </p>
              <div className="bg-secondary rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-primary h-full w-1/3 rounded-full transition-all duration-500"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">33% concluído</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;