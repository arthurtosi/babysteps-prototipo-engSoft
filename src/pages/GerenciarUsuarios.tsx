import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  profile: "aluno" | "admin";
  status: "ativo" | "inativo";
  registrationDate: string;
};

const mockUsers: User[] = [
  { id: 1, name: "Ana Silva", email: "ana.silva@email.com", profile: "aluno", status: "ativo", registrationDate: "2024-01-15" },
  { id: 2, name: "Carlos Santos", email: "carlos.santos@email.com", profile: "aluno", status: "ativo", registrationDate: "2024-01-20" },
  { id: 3, name: "Maria Oliveira", email: "maria.oliveira@email.com", profile: "admin", status: "ativo", registrationDate: "2024-01-10" },
  { id: 4, name: "João Pereira", email: "joao.pereira@email.com", profile: "aluno", status: "inativo", registrationDate: "2024-02-05" },
  { id: 5, name: "Lucia Costa", email: "lucia.costa@email.com", profile: "aluno", status: "ativo", registrationDate: "2024-02-12" },
  { id: 6, name: "Roberto Lima", email: "roberto.lima@email.com", profile: "aluno", status: "ativo", registrationDate: "2024-02-18" },
  { id: 7, name: "Fernanda Rocha", email: "fernanda.rocha@email.com", profile: "admin", status: "ativo", registrationDate: "2024-01-08" },
  { id: 8, name: "Paulo Dias", email: "paulo.dias@email.com", profile: "aluno", status: "inativo", registrationDate: "2024-02-25" },
];

export default function GerenciarUsuarios() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUserSelect = (userId: number, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      toast({
        title: "Usuário atualizado (mock)",
        description: "As alterações foram salvas com sucesso.",
      });
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Usuário removido (mock)",
      description: "O usuário foi removido do sistema.",
    });
  };

  const handleDeactivateSelected = () => {
    setUsers(users.map(user => 
      selectedUsers.includes(user.id) ? { ...user, status: "inativo" as const } : user
    ));
    setSelectedUsers([]);
    toast({
      title: "Ação concluída (mock)",
      description: `${selectedUsers.length} usuário(s) desativado(s).`,
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
          <h1 className="text-3xl font-bold text-center mb-8">Gerenciar Usuários</h1>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lista de Usuários</CardTitle>
              {selectedUsers.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeactivateSelected}
                  className="flex items-center gap-2"
                >
                  <UserX className="h-4 w-4" />
                  Desativar selecionados ({selectedUsers.length})
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => handleUserSelect(user.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.profile === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {user.profile}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(user.registrationDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover o usuário {user.name}? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveUser(user.id)}>
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input
                  id="name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">E-mail</Label>
                <Input
                  id="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profile" className="text-right">Perfil</Label>
                <Select
                  value={editingUser.profile}
                  onValueChange={(value: "aluno" | "admin") => setEditingUser({...editingUser, profile: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select
                  value={editingUser.status}
                  onValueChange={(value: "ativo" | "inativo") => setEditingUser({...editingUser, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveUser}>
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}