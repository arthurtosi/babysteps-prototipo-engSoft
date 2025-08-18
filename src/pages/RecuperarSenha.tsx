import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const RecuperarSenha = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-card rounded-2xl shadow-strong p-8 border border-border/50">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Recuperar Senha
            </h1>
            
            <div className="space-y-6">
              <p className="text-foreground/70 text-center">
                Digite seu e-mail para redefinir sua senha.
              </p>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  E-mail
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="seu@email.com"
                />
              </div>
              
              <Button asChild variant="success" size="lg" className="w-full">
                <Link to="/recuperar-senha/confirmacao">Enviar link de redefinição</Link>
              </Button>
              
              <div className="text-center">
                <Link to="/entrar" className="text-muted-foreground hover:text-foreground text-sm">
                  Voltar para Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecuperarSenha;