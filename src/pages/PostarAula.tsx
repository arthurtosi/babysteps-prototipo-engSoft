import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, Upload } from "lucide-react";

const aulaSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  urlVideo: z.string().min(1, "URL do vídeo é obrigatória"),
  materialComplementar: z.string().optional(),
});

type AulaForm = z.infer<typeof aulaSchema>;

const PostarAula = () => {
  const [aulaPublicada, setAulaPublicada] = useState<AulaForm | null>(null);

  const form = useForm<AulaForm>({
    resolver: zodResolver(aulaSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      urlVideo: "",
      materialComplementar: "",
    },
  });

  const onSubmit = (data: AulaForm) => {
    setAulaPublicada(data);
    toast({
      title: "Sucesso!",
      description: "Aula publicada com sucesso",
    });
  };

  const handleCancel = () => {
    form.reset();
    setAulaPublicada(null);
    toast({
      title: "Cancelado",
      description: "Cadastro cancelado",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Banner de área restrita */}
      <div className="bg-destructive/10 border-b border-destructive/20 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-destructive font-medium">
            🔒 Acesso restrito — somente administradores (mock)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Cadastrar Nova Aula
            </h1>
            <p className="text-muted-foreground text-lg">
              Crie e publique conteúdo educativo para os estudantes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Dados da Aula
                </CardTitle>
                <CardDescription>
                  Preencha as informações do conteúdo educativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="titulo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título da Aula</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Introdução aos Investimentos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva o conteúdo e objetivos da aula..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urlVideo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL do Vídeo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://youtube.com/watch?v=..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <Label>Material Complementar</Label>
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">
                          Arraste arquivos ou clique para fazer upload
                        </p>
                        <p className="text-muted-foreground text-xs mt-1">
                          (Funcionalidade em desenvolvimento - mock)
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" size="lg" className="flex-1">
                        Publicar Aula
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg" 
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Card de resumo (aparece após publicação) */}
            {aulaPublicada && (
              <Card className="shadow-elegant border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-success">Aula Publicada! 🎉</CardTitle>
                  <CardDescription>
                    Resumo do conteúdo cadastrado
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {aulaPublicada.titulo}
                    </h3>
                    <p className="text-muted-foreground">
                      {aulaPublicada.descricao}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Vídeo:</strong> {aulaPublicada.urlVideo}</p>
                    <p><strong>Status:</strong> Publicada</p>
                    <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Botões de navegação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link to="/admin">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Painel Admin
              </Button>
            </Link>
            <Link to="/dashboard/aulas">
              <Button variant="secondary" size="lg">
                Ir para Lista de Aulas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostarAula;