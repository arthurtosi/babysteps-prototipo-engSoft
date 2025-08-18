import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Award, Calendar, Eye } from "lucide-react";

const Perfil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com"
  });

  // Mock user data
  const userData = {
    nome: "João Silva",
    email: "joao.silva@email.com",
    foto: "/placeholder.svg"
  };

  // Mock certificates
  const certificates = [
    {
      id: 1,
      curso: "Introdução à Renda Fixa",
      dataComplemento: "15/12/2024",
      categoria: "Renda Fixa"
    },
    {
      id: 2,
      curso: "Investimentos em Ações",
      dataComplemento: "08/12/2024",
      categoria: "Ações"
    },
    {
      id: 3,
      curso: "Fundos Imobiliários",
      dataComplemento: "02/12/2024",
      categoria: "Fundos Imobiliários"
    }
  ];

  const handleEditProfile = () => {
    toast({
      title: "Perfil atualizado com sucesso",
      description: "Suas informações foram salvas.",
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Conta removida com sucesso (mock)",
      description: "Redirecionando para a tela de login...",
    });
    setTimeout(() => {
      navigate("/entrar");
    }, 2000);
  };

  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsCertificateOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
            <p className="text-muted-foreground">Gerencie suas informações pessoais e certificados</p>
          </div>

          {/* User Profile Card */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{userData.nome}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{userData.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">Editar Perfil</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                          id="nome"
                          value={editForm.nome}
                          onChange={(e) => setEditForm(prev => ({ ...prev, nome: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handleEditProfile} className="w-full">
                        Salvar Alterações
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Remover Conta</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza que deseja excluir sua conta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Meus Certificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((certificate) => (
                  <Card key={certificate.id} className="shadow-soft">
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground">{certificate.curso}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Concluído em {certificate.dataComplemento}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewCertificate(certificate)}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {certificates.length > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/perfil/certificados")}
                    className="flex-1 sm:flex-none"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Ver todos os certificados
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/perfil/historico")}
                    className="flex-1 sm:flex-none"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver histórico
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certificate Viewer Dialog */}
          <Dialog open={isCertificateOpen} onOpenChange={setIsCertificateOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Certificado de Conclusão</DialogTitle>
              </DialogHeader>
              {selectedCertificate && (
                <div className="bg-gradient-primary p-8 rounded-lg text-center text-white space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">CERTIFICADO DE CONCLUSÃO</h2>
                    <div className="h-1 bg-white/30 rounded w-32 mx-auto"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg">Certificamos que</p>
                    <h3 className="text-4xl font-bold">{userData.nome}</h3>
                    <p className="text-lg">concluiu com sucesso o curso</p>
                    <h4 className="text-2xl font-semibold">{selectedCertificate.curso}</h4>
                    <p className="text-base">na categoria {selectedCertificate.categoria}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">Data de conclusão:</p>
                    <p className="text-lg font-semibold">{selectedCertificate.dataComplemento}</p>
                  </div>

                  <div className="pt-4">
                    <div className="h-1 bg-white/30 rounded w-48 mx-auto mb-2"></div>
                    <p className="text-sm font-semibold">BabyStep$ - Educação Financeira</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

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

export default Perfil;