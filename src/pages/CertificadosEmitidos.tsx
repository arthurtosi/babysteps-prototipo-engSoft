import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Ban, RefreshCw, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type Certificate = {
  id: number;
  studentName: string;
  course: string;
  workload: number;
  issueDate: string;
  status: "Válido" | "Revogado";
};

const mockCertificates: Certificate[] = [
  { id: 1, studentName: "Ana Silva", course: "Desenvolvimento Infantil Básico", workload: 40, issueDate: "2024-01-20", status: "Válido" },
  { id: 2, studentName: "Carlos Santos", course: "Primeiros Passos Avançado", workload: 60, issueDate: "2024-01-25", status: "Válido" },
  { id: 3, studentName: "Maria Oliveira", course: "Cuidados Especiais", workload: 30, issueDate: "2024-02-01", status: "Revogado" },
  { id: 4, studentName: "João Pereira", course: "Desenvolvimento Infantil Básico", workload: 40, issueDate: "2024-02-10", status: "Válido" },
  { id: 5, studentName: "Lucia Costa", course: "Primeiros Passos Avançado", workload: 60, issueDate: "2024-02-15", status: "Válido" },
  { id: 6, studentName: "Roberto Lima", course: "Cuidados Especiais", workload: 30, issueDate: "2024-02-20", status: "Válido" },
  { id: 7, studentName: "Fernanda Rocha", course: "Desenvolvimento Infantil Básico", workload: 40, issueDate: "2024-02-25", status: "Válido" },
  { id: 8, studentName: "Paulo Dias", course: "Primeiros Passos Avançado", workload: 60, issueDate: "2024-03-01", status: "Revogado" },
  { id: 9, studentName: "Sandra Mendes", course: "Cuidados Especiais", workload: 30, issueDate: "2024-03-05", status: "Válido" },
  { id: 10, studentName: "Rafael Torres", course: "Desenvolvimento Infantil Básico", workload: 40, issueDate: "2024-03-10", status: "Válido" },
];

const courses = ["Desenvolvimento Infantil Básico", "Primeiros Passos Avançado", "Cuidados Especiais"];

export default function CertificadosEmitidos() {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    studentName: "",
    course: "",
    startDate: "",
    endDate: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const applyFilters = () => {
    let filtered = certificates.filter(cert => {
      const matchesName = !filters.studentName || cert.studentName.toLowerCase().includes(filters.studentName.toLowerCase());
      const matchesCourse = !filters.course || filters.course === 'todos' || cert.course === filters.course;
      const matchesStartDate = !filters.startDate || cert.issueDate >= filters.startDate;
      const matchesEndDate = !filters.endDate || cert.issueDate <= filters.endDate;
      
      return matchesName && matchesCourse && matchesStartDate && matchesEndDate;
    });
    
    setFilteredCertificates(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Apply filters automatically
    let filtered = certificates.filter(cert => {
      const matchesName = !newFilters.studentName || cert.studentName.toLowerCase().includes(newFilters.studentName.toLowerCase());
      const matchesCourse = !newFilters.course || newFilters.course === 'todos' || cert.course === newFilters.course;
      const matchesStartDate = !newFilters.startDate || cert.issueDate >= newFilters.startDate;
      const matchesEndDate = !newFilters.endDate || cert.issueDate <= newFilters.endDate;
      
      return matchesName && matchesCourse && matchesStartDate && matchesEndDate;
    });
    
    setFilteredCertificates(filtered);
  };

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsViewDialogOpen(true);
  };

  const handleRevokeCertificate = (certificateId: number) => {
    setCertificates(certificates.map(cert => 
      cert.id === certificateId ? { ...cert, status: "Revogado" as const } : cert
    ));
    setFilteredCertificates(filteredCertificates.map(cert => 
      cert.id === certificateId ? { ...cert, status: "Revogado" as const } : cert
    ));
    toast({
      title: "Certificado revogado (mock)",
      description: "O certificado foi revogado com sucesso.",
    });
  };

  const handleReissueCertificate = () => {
    toast({
      title: "Certificado reemitido (mock)",
      description: "Um novo certificado foi gerado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Banner */}
      <div className="bg-primary text-primary-foreground py-3 text-center">
        <p className="text-sm font-medium">Acesso restrito — somente administradores (mock)</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Certificados Emitidos</h1>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="studentName">Nome do Aluno</Label>
                  <Input
                    id="studentName"
                    placeholder="Digite o nome..."
                    value={filters.studentName}
                    onChange={(e) => handleFilterChange("studentName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="course">Curso</Label>
                  <Select value={filters.course} onValueChange={(value) => handleFilterChange("course", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os cursos</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Data Final</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Certificados ({filteredCertificates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Aluno</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Carga Horária</TableHead>
                    <TableHead>Data de Emissão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">{certificate.studentName}</TableCell>
                      <TableCell>{certificate.course}</TableCell>
                      <TableCell>{certificate.workload}h</TableCell>
                      <TableCell>{new Date(certificate.issueDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          certificate.status === 'Válido' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {certificate.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCertificate(certificate)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {certificate.status === 'Válido' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Ban className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar revogação</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja revogar o certificado de {certificate.studentName}? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRevokeCertificate(certificate.id)}>
                                    Confirmar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReissueCertificate}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Voltar ao Painel Admin
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* View Certificate Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Visualizar Certificado</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-lg border-4 border-blue-200 text-center">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-blue-800 mb-4">CERTIFICADO DE CONCLUSÃO</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>
              
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-4">Certificamos que</p>
                <h3 className="text-3xl font-bold text-blue-900 mb-4">{selectedCertificate.studentName}</h3>
                <p className="text-lg text-gray-700 mb-2">concluiu com êxito o curso</p>
                <h4 className="text-2xl font-semibold text-blue-800 mb-4">{selectedCertificate.course}</h4>
                <p className="text-md text-gray-600 mb-2">
                  com carga horária de <span className="font-semibold">{selectedCertificate.workload} horas</span>
                </p>
                <p className="text-md text-gray-600">
                  em <span className="font-semibold">{new Date(selectedCertificate.issueDate).toLocaleDateString('pt-BR')}</span>
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-blue-300">
                <div className="text-center">
                  <div className="w-32 h-1 bg-blue-600 mx-auto mb-2"></div>
                  <p className="text-lg font-bold text-blue-800">BabyStep$</p>
                  <p className="text-sm text-gray-600">Assinatura Digital</p>
                </div>
              </div>

              <div className="mt-8 text-xs text-gray-500">
                Certificado #{selectedCertificate.id.toString().padStart(6, '0')} • Status: {selectedCertificate.status}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}