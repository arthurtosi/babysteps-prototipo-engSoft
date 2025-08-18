import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StarRating from "@/components/StarRating";

const ListaAulas = () => {
  const [sortBy, setSortBy] = useState<"rating" | "recent">("rating");

  const aulas = [
    {
      id: 1,
      titulo: "Introdução a Renda Fixa",
      descricao: "Aprenda os conceitos básicos de investimentos em renda fixa e suas vantagens.",
      rating: 4.6,
      reviewCount: 128,
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      titulo: "Fundos de Investimento",
      descricao: "Entenda como funcionam os fundos e como escolher o melhor para seu perfil.",
      rating: 4.8,
      reviewCount: 95,
      dateAdded: "2024-01-20"
    },
    {
      id: 3,
      titulo: "Ações para Iniciantes",
      descricao: "Primeiros passos no mercado de ações de forma segura e consciente.",
      rating: 4.5,
      reviewCount: 203,
      dateAdded: "2024-01-25"
    },
    {
      id: 4,
      titulo: "Tesouro Direto",
      descricao: "Conheça os títulos públicos e como investir no Tesouro Direto.",
      rating: 4.7,
      reviewCount: 156,
      dateAdded: "2024-02-01"
    },
    {
      id: 5,
      titulo: "Planejamento Financeiro",
      descricao: "Organize suas finanças e crie metas de investimento realistas.",
      rating: 4.4,
      reviewCount: 89,
      dateAdded: "2024-02-05"
    },
    {
      id: 6,
      titulo: "Diversificação de Carteira",
      descricao: "Aprenda a distribuir seus investimentos para reduzir riscos.",
      rating: 4.9,
      reviewCount: 67,
      dateAdded: "2024-02-10"
    }
  ];

  const sortedAulas = [...aulas].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 px-4 pt-24 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Aulas de Investimentos
            </h1>
            <Button asChild variant="outline">
              <Link to="/dashboard">Voltar ao Dashboard</Link>
            </Button>
          </div>
          
          {/* Filtro de ordenação */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <Select value={sortBy} onValueChange={(value: "rating" | "recent") => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mais bem avaliadas</SelectItem>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAulas.map((aula) => (
              <Card key={aula.id} className="bg-gradient-card border-border/50 shadow-medium hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-foreground">
                      {aula.titulo}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <StarRating 
                        rating={aula.rating} 
                        readonly 
                        size="sm"
                      />
                      <span className="text-xs text-muted-foreground">
                        {aula.rating} ({aula.reviewCount})
                      </span>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {aula.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="hero">
                    <Link to={`/dashboard/aulas/${aula.id}`}>Assistir</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ListaAulas;