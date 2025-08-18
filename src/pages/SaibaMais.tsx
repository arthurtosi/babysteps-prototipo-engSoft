import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SaibaMais = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 px-4 pt-24 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-card rounded-2xl shadow-strong p-8 md:p-12 border border-border/50">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Por que usar o BabyStep$?
            </h1>
            
            <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed text-center mb-8 space-y-4">
              <p>
                O BabyStep$ é a plataforma perfeita para quem está começando sua jornada na educação financeira. 
                Oferecemos conteúdo didático e acessível, desenvolvido especialmente para iniciantes que querem 
                aprender a gerenciar melhor suas finanças pessoais.
              </p>
              
              <p>
                Nossa plataforma inclui simuladores de investimento sem riscos reais, permitindo que você pratique 
                e experimente diferentes estratégias de investimento antes de aplicar seu dinheiro de verdade. 
                Aprenda fazendo, sem medo de errar!
              </p>
              
              <p>
                Com uma interface intuitiva e moderna, o BabyStep$ transforma o aprendizado financeiro em uma 
                experiência envolvente e prática, ajudando você a dar seus primeiros passos rumo à independência financeira.
              </p>
            </div>
            
            <div className="text-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/">Voltar</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SaibaMais;