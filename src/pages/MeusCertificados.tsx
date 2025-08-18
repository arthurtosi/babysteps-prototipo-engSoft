import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Award, Calendar, Download, Eye, BookOpen, ArrowLeft, SortAsc, SortDesc } from "lucide-react";

type Certificate = {
  id: number;
  curso: string;
  cargaHoraria: number;
  dataEmissao: string;
  categoria: string;
};

const mockCertificates: Certificate[] = [
  {
    id: 1,
    curso: "Investimentos para Iniciantes",
    cargaHoraria: 12,
    dataEmissao: "2024-07-20",
    categoria: "Investimentos"
  },
  {
    id: 2,
    curso: "Planejamento Financeiro Pessoal",
    cargaHoraria: 15,
    dataEmissao: "2024-06-15",
    categoria: "Planejamento"
  },
  {
    id: 3,
    curso: "Introdução à Renda Fixa",
    cargaHoraria: 10,
    dataEmissao: "2024-05-30",
    categoria: "Renda Fixa"
  },
  {
    id: 4,
    curso: "Fundos de Investimento",
    cargaHoraria: 18,
    dataEmissao: "2024-04-22",
    categoria: "Investimentos"
  },
  {
    id: 5,
    curso: "Educação Financeira Básica",
    cargaHoraria: 8,
    dataEmissao: "2024-03-10",
    categoria: "Educação"
  },
  {
    id: 6,
    curso: "Análise de Investimentos",
    cargaHoraria: 20,
    dataEmissao: "2024-02-05",
    categoria: "Investimentos"
  }
];

const MeusCertificados = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"recente" | "antiga">("recente");

  // Usuario mock
  const userData = {
    nome: "João Silva"
  };

  const sortedCertificates = [...certificates].sort((a, b) => {
    const dateA = new Date(a.dataEmissao).getTime();
    const dateB = new Date(b.dataEmissao).getTime();
    return sortOrder === "recente" ? dateB - dateA : dateA - dateB;
  });

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsViewDialogOpen(true);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    toast({
      title: "Download iniciado (mock)",
      description: `Baixando certificado do curso "${certificate.curso}"`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Estado vazio
  if (certificates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <DashboardHeader />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Meus Certificados</h1>
              <p className="text-muted-foreground">Visualize e gerencie seus certificados de conclusão</p>
            </div>

            <div className="text-center py-16">
              <div className="mb-6">
                <Award className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Você ainda não possui certificados
                </h2>
                <p className="text-muted-foreground mb-6">
                  Conclua um curso para emitir seu primeiro certificado
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate("/dashboard/aulas")}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Aulas
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard/perfil")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Perfil
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Meus Certificados</h1>
            <p className="text-muted-foreground">Visualize e gerencie seus certificados de conclusão</p>
          </div>

          {/* Controles de ordenação */}
          <Card className="shadow-medium mb-6">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {certificates.length} certificado{certificates.length !== 1 ? 's' : ''} encontrado{certificates.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Ordenar por:</span>
                  <Select value={sortOrder} onValueChange={(value: "recente" | "antiga") => setSortOrder(value)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recente">
                        <div className="flex items-center gap-2">
                          <SortDesc className="h-4 w-4" />
                          Data mais recente
                        </div>
                      </SelectItem>
                      <SelectItem value="antiga">
                        <div className="flex items-center gap-2">
                          <SortAsc className="h-4 w-4" />
                          Data mais antiga
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de certificados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sortedCertificates.map((certificate) => (
              <Card key={certificate.id} className="shadow-elegant hover:shadow-glow transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-base leading-tight">{certificate.curso}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Carga horária: {certificate.cargaHoraria}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Emitido em: {formatDate(certificate.dataEmissao)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleViewCertificate(certificate)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDownloadCertificate(certificate)}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Baixar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navegação */}
          <div className="text-center">
            <Button variant="outline" onClick={() => navigate("/dashboard/perfil")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Perfil
            </Button>
          </div>
        </div>
      </main>

      {/* Modal de visualização do certificado */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Certificado de Conclusão</DialogTitle>
          </DialogHeader>
          
          {selectedCertificate && (
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
                      {userData.nome}
                    </p>
                  </div>

                  <p className="text-lg">
                    concluiu com aproveitamento o curso
                  </p>

                  <div className="border-b-2 border-primary/30 pb-2">
                    <p className="text-2xl font-semibold text-primary">
                      {selectedCertificate.curso}
                    </p>
                  </div>

                  <div className="flex justify-center gap-8 text-lg">
                    <p>
                      <strong>Carga Horária:</strong> {selectedCertificate.cargaHoraria} horas
                    </p>
                    <p>
                      <strong>Data de Emissão:</strong> {formatDate(selectedCertificate.dataEmissao)}
                    </p>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex justify-center">
                    <div className="border-t-2 border-primary/50 w-64 pt-2">
                      <p className="text-lg font-semibold text-primary">BabyStep$</p>
                      <p className="text-sm text-muted-foreground">Assinatura Digital (mock)</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Certificado válido e verificável
                  </p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Fechar
                </Button>
                <Button onClick={() => handleDownloadCertificate(selectedCertificate)}>
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

export default MeusCertificados;