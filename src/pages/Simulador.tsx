import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Simulador = () => {
  const navigate = useNavigate();
  const [selectedInvestment, setSelectedInvestment] = useState("");
  const [formData, setFormData] = useState({
    valorInicial: "",
    tempoMeses: "",
    taxaRendimento: "",
    aporteMensal: ""
  });

  const investmentTypes = [
    { id: "renda-fixa", label: "Renda Fixa" },
    { id: "acoes", label: "Ações" },
    { id: "fundos-imobiliarios", label: "Fundos Imobiliários" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSimulate = () => {
    // Navigate to results with form data
    navigate("/dashboard/simulador/resultados", { 
      state: { 
        ...formData, 
        investmentType: investmentTypes.find(inv => inv.id === selectedInvestment)?.label 
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/20">
      <DashboardHeader />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Simulador de Investimentos
            </h1>
            <Link to="/dashboard">
              <Button variant="outline">Voltar ao Dashboard</Button>
            </Link>
          </div>

          <div className="grid gap-8">
            {/* Investment Type Selection */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Escolha o Tipo de Investimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {investmentTypes.map((investment) => (
                    <Card 
                      key={investment.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-glow ${
                        selectedInvestment === investment.id 
                          ? "ring-2 ring-primary bg-primary/5" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedInvestment(investment.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <h3 className="font-semibold text-lg">{investment.label}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investment Form */}
            {selectedInvestment && (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle>Dados da Simulação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="valorInicial">Valor Inicial (R$)</Label>
                      <Input
                        id="valorInicial"
                        type="number"
                        placeholder="1000"
                        value={formData.valorInicial}
                        onChange={(e) => handleInputChange("valorInicial", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tempoMeses">Tempo (meses)</Label>
                      <Input
                        id="tempoMeses"
                        type="number"
                        placeholder="12"
                        value={formData.tempoMeses}
                        onChange={(e) => handleInputChange("tempoMeses", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="taxaRendimento">Taxa de Rendimento (%)</Label>
                      <Input
                        id="taxaRendimento"
                        type="number"
                        step="0.1"
                        placeholder="0.8"
                        value={formData.taxaRendimento}
                        onChange={(e) => handleInputChange("taxaRendimento", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aporteMensal">Aporte Mensal (R$)</Label>
                      <Input
                        id="aporteMensal"
                        type="number"
                        placeholder="200"
                        value={formData.aporteMensal}
                        onChange={(e) => handleInputChange("aporteMensal", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      size="lg" 
                      className="min-w-48"
                      onClick={handleSimulate}
                      disabled={!formData.valorInicial || !formData.tempoMeses || !formData.taxaRendimento}
                    >
                      Simular
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Simulador;