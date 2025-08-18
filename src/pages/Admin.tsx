import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Users, FileText } from "lucide-react";

const Admin = () => {
  const adminCards = [
    {
      title: "Postar Aula",
      description: "Criar e publicar novo conteúdo educativo",
      icon: BookOpen,
      link: "/admin/aulas/postar",
      variant: "default" as const,
    },
    {
      title: "Gerar Certificado",
      description: "Emitir certificados para estudantes",
      icon: Award,
      link: "/admin/certificados/gerar",
      variant: "secondary" as const,
    },
    {
      title: "Gerenciar Usuários",
      description: "Administrar contas de usuários e permissões",
      icon: Users,
      link: "/admin/usuarios",
      variant: "outline" as const,
    },
    {
      title: "Certificados Emitidos",
      description: "Visualizar e gerenciar certificados emitidos",
      icon: FileText,
      link: "/admin/certificados",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Banner de área restrita */}
      <div className="bg-destructive/10 border-b border-destructive/20 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-destructive font-medium">
            🔒 Área Restrita — Administradores (mock)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Título da página */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Painel de Administração
            </h1>
            <p className="text-muted-foreground text-lg">
              Gerencie conteúdos e funcionalidades da plataforma
            </p>
          </div>

          {/* Cards de ação */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {adminCards.map((card) => (
              <Card 
                key={card.title} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <card.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={card.link}>
                    <Button 
                      variant={card.variant}
                      size="lg" 
                      className="w-full group-hover:scale-105 transition-transform duration-200"
                    >
                      Acessar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão voltar */}
          <div className="text-center">
            <Link to="/dashboard">
              <Button variant="outline" size="lg">
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;