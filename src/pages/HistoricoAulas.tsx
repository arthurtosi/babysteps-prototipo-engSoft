import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";
import { BookOpen, ArrowLeft, Eye, Award, Calendar, Filter } from "lucide-react";

type HistoricoItem = {
  id: number;
  aulaId: number;
  aula: string;
  status: "Concluída" | "Em andamento";
  data: string;
  quiz: string;
  avaliacao: number;
};

const mockHistorico: HistoricoItem[] = [
  {
    id: 1,
    aulaId: 1,
    aula: "Introdução à Renda Fixa",
    status: "Concluída",
    data: "2024-01-15",
    quiz: "85%",
    avaliacao: 4.6
  },
  {
    id: 2,
    aulaId: 2,
    aula: "Fundos de Investimento",
    status: "Concluída",
    data: "2024-01-20",
    quiz: "92%",
    avaliacao: 4.8
  },
  {
    id: 3,
    aulaId: 3,
    aula: "Ações para Iniciantes",
    status: "Em andamento",
    data: "2024-01-25",
    quiz: "Não realizado",
    avaliacao: 0
  },
  {
    id: 4,
    aulaId: 4,
    aula: "Tesouro Direto",
    status: "Concluída",
    data: "2024-02-01",
    quiz: "78%",
    avaliacao: 4.7
  },
  {
    id: 5,
    aulaId: 5,
    aula: "Planejamento Financeiro",
    status: "Concluída",
    data: "2024-02-05",
    quiz: "88%",
    avaliacao: 4.4
  },
  {
    id: 6,
    aulaId: 6,
    aula: "Diversificação de Carteira",
    status: "Em andamento",
    data: "2024-02-10",
    quiz: "Não realizado",
    avaliacao: 0
  },
  {
    id: 7,
    aulaId: 7,
    aula: "Análise Fundamentalista",
    status: "Concluída",
    data: "2024-02-15",
    quiz: "95%",
    avaliacao: 4.9
  },
  {
    id: 8,
    aulaId: 8,
    aula: "Mercado de Capitais",
    status: "Concluída",
    data: "2024-02-20",
    quiz: "82%",
    avaliacao: 4.5
  },
  {
    id: 9,
    aulaId: 9,
    aula: "Previdência Privada",
    status: "Em andamento",
    data: "2024-02-25",
    quiz: "Não realizado",
    avaliacao: 0
  },
  {
    id: 10,
    aulaId: 10,
    aula: "Tributação de Investimentos",
    status: "Concluída",
    data: "2024-03-01",
    quiz: "87%",
    avaliacao: 4.3
  }
];

const HistoricoAulas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [historico] = useState<HistoricoItem[]>(mockHistorico);
  const [filteredHistorico, setFilteredHistorico] = useState<HistoricoItem[]>(mockHistorico);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [filters, setFilters] = useState({
    status: "todos",
    dataInicial: "",
    dataFinal: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    let filtered = historico.filter(item => {
      const matchesStatus = newFilters.status === "todos" || item.status === newFilters.status;
      const matchesStartDate = !newFilters.dataInicial || item.data >= newFilters.dataInicial;
      const matchesEndDate = !newFilters.dataFinal || item.data <= newFilters.dataFinal;
      
      return matchesStatus && matchesStartDate && matchesEndDate;
    });
    
    setFilteredHistorico(filtered);
  };

  const handleReviewClass = (aulaId: number) => {
    navigate(`/dashboard/aulas/${aulaId}`);
  };

  const handleViewCertificate = (item: HistoricoItem) => {
    if (item.status === "Concluída") {
      setShowCertificateDialog(true);
    } else {
      toast({
        title: "Certificado não disponível",
        description: "Complete a aula para ter acesso ao certificado.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Estado vazio
  if (historico.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <DashboardHeader />
        
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Histórico de Aulas</h1>
              <p className="text-muted-foreground">Acompanhe seu progresso nos cursos</p>
            </div>

            <div className="text-center py-16">
              <div className="mb-6">
                <BookOpen className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Você ainda não possui histórico de aulas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Comece assistindo suas primeiras aulas para acompanhar seu progresso
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Histórico de Aulas</h1>
            <p className="text-muted-foreground">Acompanhe seu progresso nos cursos</p>
          </div>

          {/* Filtros */}
          <Card className="shadow-medium mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Concluída">Concluída</SelectItem>
                      <SelectItem value="Em andamento">Em andamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataInicial">Data Inicial</Label>
                  <Input
                    id="dataInicial"
                    type="date"
                    value={filters.dataInicial}
                    onChange={(e) => handleFilterChange("dataInicial", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dataFinal">Data Final</Label>
                  <Input
                    id="dataFinal"
                    type="date"
                    value={filters.dataFinal}
                    onChange={(e) => handleFilterChange("dataFinal", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela */}
          <Card className="shadow-medium mb-8">
            <CardHeader>
              <CardTitle>
                Histórico ({filteredHistorico.length} aula{filteredHistorico.length !== 1 ? 's' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aula</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Avaliação</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistorico.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.aula}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === "Concluída" ? "default" : "secondary"}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(item.data)}</TableCell>
                        <TableCell>
                          <span className={item.quiz === "Não realizado" ? "text-muted-foreground" : "font-medium"}>
                            {item.quiz}
                          </span>
                        </TableCell>
                        <TableCell>
                          {item.avaliacao > 0 ? (
                            <StarRating rating={item.avaliacao} readonly size="sm" />
                          ) : (
                            <span className="text-muted-foreground text-sm">Não avaliada</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReviewClass(item.aulaId)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Rever
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCertificate(item)}
                              disabled={item.status !== "Concluída"}
                            >
                              <Award className="h-4 w-4 mr-1" />
                              Certificado
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Navegação */}
          <div className="text-center">
            <Button variant="outline" onClick={() => navigate("/dashboard/perfil")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Perfil
            </Button>
          </div>
        </div>
      </main>

      {/* Modal de Certificado */}
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Certificado de Conclusão</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <Award className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Disponível após conclusão do curso</h3>
            <p className="text-muted-foreground mb-4">
              Complete todas as aulas do curso para ter acesso ao certificado oficial.
            </p>
            <Button onClick={() => setShowCertificateDialog(false)}>
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HistoricoAulas;