import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ConfirmacaoRecuperacao = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-card rounded-2xl shadow-strong p-8 border border-border/50 text-center">
            <div className="text-4xl mb-6">✅</div>
            
            <h1 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Link Enviado!
            </h1>
            
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Um link de redefinição foi enviado para seu e-mail.
            </p>
            
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/entrar">Voltar para Login</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConfirmacaoRecuperacao;