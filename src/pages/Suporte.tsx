import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, MessageSquare, Send } from "lucide-react";

const Suporte = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const faqItems = [
    {
      id: "item-1",
      question: "Como faço para redefinir minha senha?",
      answer: "Para redefinir sua senha, clique em 'Esqueci minha senha' na tela de login e siga as instruções enviadas para seu e-mail cadastrado."
    },
    {
      id: "item-2", 
      question: "Como funcionam os simuladores de investimento?",
      answer: "Nossos simuladores permitem que você teste diferentes cenários de investimento inserindo valores como aporte inicial, tempo e taxa de rendimento para visualizar possíveis resultados."
    },
    {
      id: "item-3",
      question: "Posso excluir minha conta?",
      answer: "Sim, você pode excluir sua conta acessando seu perfil e clicando em 'Remover Conta'. Esta ação é irreversível e todos os seus dados serão permanentemente removidos."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sua solicitação foi enviada com sucesso",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setContactForm({ nome: "", email: "", mensagem: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Ajuda e Suporte</h1>
            <p className="text-muted-foreground">Encontre respostas para suas dúvidas ou entre em contato conosco</p>
          </div>

          {/* FAQ Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Entre em Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Ainda com dúvidas? Envie uma mensagem para nossa equipe.
              </p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      value={contactForm.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Descreva sua dúvida ou problema..."
                    className="min-h-[120px]"
                    value={contactForm.mensagem}
                    onChange={(e) => handleInputChange("mensagem", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Suporte;