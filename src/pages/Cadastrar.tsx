import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Cadastrar = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div className="w-full max-w-md">
          <div className="bg-gradient-card rounded-2xl shadow-strong p-8 border border-border/50">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Cadastrar
            </h1>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nome completo
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Senha
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Confirmar senha
                </label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              
              <Button asChild variant="success" size="lg" className="w-full">
                <Link to="/dashboard">Criar conta</Link>
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-muted-foreground text-sm">
                  Já tem uma conta?{" "}
                  <Link to="/entrar" className="text-primary hover:text-primary-hover font-medium">
                    Faça login
                  </Link>
                </p>
                <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
                  Voltar para início
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

export default Cadastrar;