import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";
import { Play } from "lucide-react";

const TelaAula = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [quizCompleto, setQuizCompleto] = useState(false);
  const [comentario, setComentario] = useState("");
  const [userRating, setUserRating] = useState(0);

  const aulas = {
    "1": {
      titulo: "Introdução a Renda Fixa",
      descricao: "Nesta aula você aprenderá os conceitos fundamentais de renda fixa, conhecerá os principais tipos de investimentos desta categoria e entenderá como eles podem fazer parte da sua estratégia de investimentos.",
      rating: 4.6,
      reviewCount: 128
    },
    "2": {
      titulo: "Fundos de Investimento", 
      descricao: "Descubra como funcionam os fundos de investimento, suas vantagens e como escolher o fundo ideal para seu perfil de investidor e objetivos financeiros.",
      rating: 4.8,
      reviewCount: 95
    },
    "3": {
      titulo: "Ações para Iniciantes",
      descricao: "Aprenda os primeiros passos para investir em ações de forma segura, entenda os conceitos básicos do mercado acionário e como analisar empresas.",
      rating: 4.5,
      reviewCount: 203
    }
  };

  const aulaAtual = aulas[id as keyof typeof aulas] || aulas["1"];

  const comentarios = [
    {
      nome: "Maria Silva",
      data: "2 dias atrás",
      texto: "Excelente aula! Muito didática e fácil de entender."
    },
    {
      nome: "João Santos", 
      data: "1 semana atrás",
      texto: "Conteúdo muito bem explicado, estava com dúvidas sobre renda fixa."
    },
    {
      nome: "Ana Costa",
      data: "2 semanas atrás", 
      texto: "Perfeito para quem está começando a investir!"
    }
  ];

  const perguntas = [
    {
      pergunta: "Qual é a principal característica da renda fixa?",
      opcoes: ["Rentabilidade variável", "Rentabilidade previsível", "Alto risco", "Liquidez diária"]
    },
    {
      pergunta: "Qual investimento é considerado mais seguro?",
      opcoes: ["Ações", "Tesouro Direto", "Criptomoedas", "Fundos imobiliários"]
    },
    {
      pergunta: "O que significa diversificação?",
      opcoes: ["Investir tudo em um produto", "Distribuir investimentos", "Vender rapidamente", "Comprar apenas ações"]
    }
  ];

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Obrigado pela avaliação (mock)",
      description: `Você avaliou esta aula com ${rating} estrela${rating !== 1 ? 's' : ''}.`
    });
  };

  const handleQuizSubmit = () => {
    setQuizCompleto(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 px-4 pt-24 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {aulaAtual.titulo}
            </h1>
            
            {/* Avaliação da Aula */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-4">
                <StarRating 
                  rating={aulaAtual.rating} 
                  readonly 
                  showText 
                  reviewCount={aulaAtual.reviewCount}
                  size="md"
                />
                <span className="text-sm text-muted-foreground">– mock</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Avalie esta aula:</p>
                <StarRating 
                  rating={userRating} 
                  onRatingChange={handleRatingChange}
                  size="lg"
                />
              </div>
            </div>
            
            {/* Player Placeholder */}
            <div className="bg-gradient-card rounded-xl border border-border/50 shadow-medium mb-6 overflow-hidden">
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <Button size="xl" className="rounded-full w-20 h-20">
                  <Play className="w-8 h-8" />
                </Button>
              </div>
            </div>
            
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              {aulaAtual.descricao}
            </p>
          </div>

          {/* Comentários */}
          <Card className="mb-8 bg-gradient-card border-border/50 shadow-medium">
            <CardHeader>
              <CardTitle>Comentários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Escreva um comentário (mock)..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />
                <Button variant="hero">Publicar</Button>
              </div>
              
              <div className="space-y-4 border-t border-border pt-4">
                {comentarios.map((comentario, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-foreground">{comentario.nome}</span>
                      <span className="text-xs text-muted-foreground">{comentario.data}</span>
                    </div>
                    <p className="text-foreground/80">{comentario.texto}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="mb-8 bg-gradient-card border-border/50 shadow-medium">
            <CardHeader>
              <CardTitle>Quiz rápido</CardTitle>
              <CardDescription>Teste seus conhecimentos sobre a aula</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!quizCompleto ? (
                <>
                  {perguntas.map((pergunta, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-medium text-foreground">
                        {index + 1}. {pergunta.pergunta}
                      </h4>
                      <RadioGroup>
                        {pergunta.opcoes.map((opcao, opcaoIndex) => (
                          <div key={opcaoIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={opcao} id={`q${index}-${opcaoIndex}`} />
                            <Label htmlFor={`q${index}-${opcaoIndex}`} className="text-foreground/80">
                              {opcao}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                  <Button onClick={handleQuizSubmit} variant="success" className="w-full">
                    Enviar
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Parabéns! Você concluiu o quiz (mock).
                  </h3>
                  <p className="text-muted-foreground">
                    Continue aprendendo com nossas próximas aulas!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de Navegação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard/aulas">Voltar para Aulas</Link>
            </Button>
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">Ir ao Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TelaAula;