import { Link, useLocation } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ResultadosSimulacao = () => {
  const location = useLocation();
  const data = location.state || {};
  
  // Mock calculations
  const valorInicial = parseFloat(data.valorInicial) || 1000;
  const tempoMeses = parseInt(data.tempoMeses) || 12;
  const taxaRendimento = parseFloat(data.taxaRendimento) || 0.8;
  const aporteMensal = parseFloat(data.aporteMensal) || 200;
  
  const valorFinal = valorInicial * Math.pow(1 + taxaRendimento/100, tempoMeses) + (aporteMensal * tempoMeses);
  const lucroTotal = valorFinal - valorInicial - (aporteMensal * tempoMeses);

  // Mock historical data
  const historico = [
    { data: "15/01/2025", tipo: "Renda Fixa", valorInicial: "R$ 1.000", valorFinal: "R$ 1.096" },
    { data: "10/01/2025", tipo: "Ações", valorInicial: "R$ 2.500", valorFinal: "R$ 2.750" },
    { data: "05/01/2025", tipo: "Fundos Imobiliários", valorInicial: "R$ 5.000", valorFinal: "R$ 5.420" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <DashboardHeader />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">
            Resultados da Simulação
          </h1>

          <div className="grid gap-8">
            {/* Results Summary */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Resumo da Simulação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tipo de Investimento</p>
                    <p className="text-lg font-semibold">{data.investmentType || "Renda Fixa"}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor Inicial</p>
                    <p className="text-lg font-semibold">R$ {valorInicial.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Aporte Mensal</p>
                    <p className="text-lg font-semibold">R$ {aporteMensal.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tempo</p>
                    <p className="text-lg font-semibold">{tempoMeses} meses</p>
                  </div>
                  
                  <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground">Valor Final Estimado</p>
                    <p className="text-xl font-bold text-primary">R$ {valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                  
                  <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-sm text-muted-foreground">Lucro Total</p>
                    <p className="text-xl font-bold text-success">R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Placeholder */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Evolução do Investimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/20 rounded-lg p-8 flex items-center justify-center min-h-64">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Gráfico de Evolução</p>
                    <p className="text-muted-foreground">Placeholder - Evolução do investimento ao longo do tempo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Message */}
            <Card className="shadow-elegant border-success/20 bg-success/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-success">Simulação concluída com sucesso (mock)</p>
                </div>
              </CardContent>
            </Card>

            {/* Historical Simulations */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Histórico de Simulações</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo de Investimento</TableHead>
                      <TableHead>Valor Inicial</TableHead>
                      <TableHead>Valor Final</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historico.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.data}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell>{item.valorInicial}</TableCell>
                        <TableCell className="font-medium text-success">{item.valorFinal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard/simulador">
                <Button size="lg" className="w-full sm:w-auto">
                  Nova Simulação
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultadosSimulacao;