import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import SaibaMais from "./pages/SaibaMais";
import RecuperarSenha from "./pages/RecuperarSenha";
import ConfirmacaoRecuperacao from "./pages/ConfirmacaoRecuperacao";
import Dashboard from "./pages/Dashboard";
import ListaAulas from "./pages/ListaAulas";
import TelaAula from "./pages/TelaAula";
import Simulador from "./pages/Simulador";
import ResultadosSimulacao from "./pages/ResultadosSimulacao";
import Perfil from "./pages/Perfil";
import Suporte from "./pages/Suporte";
import Admin from "./pages/Admin";
import PostarAula from "./pages/PostarAula";
import GerarCertificado from "./pages/GerarCertificado";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";
import CertificadosEmitidos from "./pages/CertificadosEmitidos";
import MeusCertificados from "./pages/MeusCertificados";
import HistoricoAulas from "./pages/HistoricoAulas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/saiba-mais" element={<SaibaMais />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha/confirmacao" element={<ConfirmacaoRecuperacao />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/aulas" element={<ListaAulas />} />
          <Route path="/dashboard/aulas/:id" element={<TelaAula />} />
          <Route path="/dashboard/simulador" element={<Simulador />} />
          <Route path="/dashboard/simulador/resultados" element={<ResultadosSimulacao />} />
          <Route path="/dashboard/perfil" element={<Perfil />} />
          <Route path="/perfil/certificados" element={<MeusCertificados />} />
          <Route path="/perfil/historico" element={<HistoricoAulas />} />
          <Route path="/dashboard/suporte" element={<Suporte />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/aulas/postar" element={<PostarAula />} />
          <Route path="/admin/certificados/gerar" element={<GerarCertificado />} />
          <Route path="/admin/usuarios" element={<GerenciarUsuarios />} />
          <Route path="/admin/certificados" element={<CertificadosEmitidos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
