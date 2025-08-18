import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                BabyStep$
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Aprenda educação financeira de forma simples e pratique com simuladores de investimento sem riscos.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <Link to="/entrar">Entrar</Link>
              </Button>
              
              <Button asChild variant="success" size="xl" className="w-full sm:w-auto">
                <Link to="/cadastrar">Cadastrar</Link>
              </Button>
              
              <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
                <Link to="/saiba-mais">Saiba mais</Link>
              </Button>
            </div>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 pt-16">
              <div className="bg-gradient-card rounded-xl p-6 shadow-medium border border-border/50">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Aprendizado Simples
                </h3>
                <p className="text-muted-foreground text-sm">
                  Conteúdo didático e acessível para iniciantes em educação financeira
                </p>
              </div>
              
              <div className="bg-gradient-card rounded-xl p-6 shadow-medium border border-border/50">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Simuladores Seguros
                </h3>
                <p className="text-muted-foreground text-sm">
                  Pratique investimentos sem riscos reais em um ambiente controlado
                </p>
              </div>
              
              <div className="bg-gradient-card rounded-xl p-6 shadow-medium border border-border/50">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Resultados Práticos
                </h3>
                <p className="text-muted-foreground text-sm">
                  Desenvolva habilidades financeiras aplicáveis no mundo real
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
