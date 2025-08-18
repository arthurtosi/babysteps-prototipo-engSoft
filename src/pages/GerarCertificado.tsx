import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Award, CalendarIcon, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

const certificadoSchema = z.object({
  nomeAluno: z.string().min(1, "Nome do aluno é obrigatório"),
  cursoSelecionado: z.string().min(1, "Selecione um curso"),
  cargaHoraria: z.number().min(1, "Carga horária deve ser maior que 0"),
  dataConclusao: z.date({ required_error: "Data de conclusão é obrigatória" }),
});

type CertificadoForm = z.infer<typeof certificadoSchema>;

const cursos = [
  { id: "fundamentos", nome: "Fundamentos de Educação Financeira", horas: 20 },
  { id: "investimentos", nome: "Introdução aos Investimentos", horas: 30 },
  { id: "planejamento", nome: "Planejamento Financeiro Pessoal", horas: 25 },
];

const GerarCertificado = () => {
  const [certificadoGerado, setCertificadoGerado] = useState<CertificadoForm | null>(null);
  const [showCertificado, setShowCertificado] = useState(false);

  const form = useForm<CertificadoForm>({
    resolver: zodResolver(certificadoSchema),
    defaultValues: {
      nomeAluno: "",
      cursoSelecionado: undefined,
      cargaHoraria: 0,
    },
  });

  const onSubmit = (data: CertificadoForm) => {
    setCertificadoGerado(data);
    setShowCertificado(true);
    toast({
      title: "Certificado gerado!",
      description: "Certificado criado com sucesso",
    });
  };

  const cursoSelecionado = cursos.find(c => c.id === form.watch("cursoSelecionado"));

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
              Gerar Certificado de Conclusão
            </h1>
            <p className="text-muted-foreground text-lg">
              Emita certificados para estudantes que completaram os cursos
            </p>
          </div>

          {/* Formulário */}
          <Card className="shadow-elegant max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Dados do Certificado
              </CardTitle>
              <CardDescription>
                Preencha as informações do estudante e curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nomeAluno"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Aluno</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite o nome completo do aluno"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cursoSelecionado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curso Concluído</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            const curso = cursos.find(c => c.id === value);
                            if (curso) {
                              form.setValue("cargaHoraria", curso.horas);
                            }
                          }} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um curso" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cursos.map((curso) => (
                              <SelectItem key={curso.id} value={curso.id}>
                                {curso.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cargaHoraria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carga Horária (horas)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="20"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dataConclusao"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Conclusão</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full">
                    <Award className="h-4 w-4 mr-2" />
                    Gerar Certificado
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Botão voltar */}
          <div className="text-center mt-8">
            <Link to="/admin">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Painel Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal do Certificado */}
      <Dialog open={showCertificado} onOpenChange={setShowCertificado}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center justify-between">
              Certificado de Conclusão
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCertificado(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {certificadoGerado && (
            <div className="p-8 bg-white">
              {/* Certificado */}
              <div className="border-8 border-primary/20 p-12 text-center space-y-8 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-primary">CERTIFICADO</h1>
                  <h2 className="text-2xl font-semibold text-muted-foreground">
                    DE CONCLUSÃO
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-lg">
                    Certificamos que
                  </p>
                  
                  <div className="border-b-2 border-primary/30 pb-2">
                    <p className="text-3xl font-bold text-primary">
                      {certificadoGerado.nomeAluno}
                    </p>
                  </div>

                  <p className="text-lg">
                    concluiu com aproveitamento o curso
                  </p>

                  <div className="border-b-2 border-primary/30 pb-2">
                    <p className="text-2xl font-semibold text-primary">
                      {cursos.find(c => c.id === certificadoGerado.cursoSelecionado)?.nome}
                    </p>
                  </div>

                  <div className="flex justify-center gap-8 text-lg">
                    <p>
                      <strong>Carga Horária:</strong> {certificadoGerado.cargaHoraria} horas
                    </p>
                    <p>
                      <strong>Data de Conclusão:</strong> {format(certificadoGerado.dataConclusao, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex justify-center">
                    <div className="border-t-2 border-primary/50 w-64 pt-2">
                      <p className="text-lg font-semibold text-primary">BabyStep$</p>
                      <p className="text-sm text-muted-foreground">Assinatura Digital</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Certificado gerado em {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" onClick={() => setShowCertificado(false)}>
                  Fechar
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF (mock)
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GerarCertificado;