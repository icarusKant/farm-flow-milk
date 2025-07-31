import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Calendar } from "lucide-react";

interface RevenueCalculation {
  id: string;
  period: string;
  totalLiters: number;
  pricePerLiter: number;
  totalRevenue: number;
  date: string;
}

const Revenue = () => {
  const [totalLiters, setTotalLiters] = useState("");
  const [pricePerLiter, setPricePerLiter] = useState("1.50");
  const [period, setPeriod] = useState("");
  
  const [calculations, setCalculations] = useState<RevenueCalculation[]>([
    {
      id: "1",
      period: "Janeiro 2024",
      totalLiters: 7200,
      pricePerLiter: 1.50,
      totalRevenue: 10800,
      date: "2024-01-31"
    },
    {
      id: "2", 
      period: "Dezembro 2023",
      totalLiters: 6850,
      pricePerLiter: 1.45,
      totalRevenue: 9932.50,
      date: "2023-12-31"
    }
  ]);

  const currentRevenue = parseFloat(totalLiters) * parseFloat(pricePerLiter) || 0;

  const handleCalculateRevenue = () => {
    if (totalLiters && pricePerLiter && period) {
      const newCalculation: RevenueCalculation = {
        id: Date.now().toString(),
        period,
        totalLiters: parseFloat(totalLiters),
        pricePerLiter: parseFloat(pricePerLiter),
        totalRevenue: currentRevenue,
        date: new Date().toISOString().split('T')[0]
      };
      
      setCalculations([newCalculation, ...calculations]);
      setTotalLiters("");
      setPeriod("");
    }
  };

  const monthlyAverage = calculations.length > 0 
    ? calculations.reduce((sum, calc) => sum + calc.totalRevenue, 0) / calculations.length 
    : 0;

  const totalThisYear = calculations
    .filter(calc => calc.date.startsWith('2024'))
    .reduce((sum, calc) => sum + calc.totalRevenue, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-farm-green" />
              <div>
                <p className="text-sm text-muted-foreground">Receita Total (2024)</p>
                <p className="text-2xl font-bold text-farm-green">
                  R$ {totalThisYear.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-farm-green" />
              <div>
                <p className="text-sm text-muted-foreground">Média Mensal</p>
                <p className="text-2xl font-bold text-farm-green">
                  R$ {monthlyAverage.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-farm-green" />
              <div>
                <p className="text-sm text-muted-foreground">Preço Atual/L</p>
                <p className="text-2xl font-bold text-farm-green">R$ {parseFloat(pricePerLiter).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Calculator */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calculadora de Receitas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fevereiro 2024">Fevereiro 2024</SelectItem>
                  <SelectItem value="Março 2024">Março 2024</SelectItem>
                  <SelectItem value="Abril 2024">Abril 2024</SelectItem>
                  <SelectItem value="Quinzena 1 - Fev 2024">Quinzena 1 - Fev 2024</SelectItem>
                  <SelectItem value="Quinzena 2 - Fev 2024">Quinzena 2 - Fev 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Total de Litros Produzidos</Label>
              <Input
                type="number"
                placeholder="0"
                value={totalLiters}
                onChange={(e) => setTotalLiters(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Preço por Litro (R$)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="1.50"
                value={pricePerLiter}
                onChange={(e) => setPricePerLiter(e.target.value)}
              />
            </div>

            {/* Live Calculation Display */}
            <div className="p-4 bg-gradient-to-r from-farm-green to-farm-green-light rounded-lg text-white">
              <p className="text-sm opacity-90">Receita Calculada</p>
              <p className="text-3xl font-bold">
                R$ {currentRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              {totalLiters && (
                <p className="text-sm opacity-90">
                  {totalLiters} L × R$ {parseFloat(pricePerLiter).toFixed(2)}
                </p>
              )}
            </div>

            <Button 
              variant="farm" 
              className="w-full" 
              onClick={handleCalculateRevenue}
              disabled={!totalLiters || !pricePerLiter || !period}
            >
              Salvar Cálculo
            </Button>
          </CardContent>
        </Card>

        {/* Quick Calculations */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green">Simulações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Projeções com Preço Atual (R$ {parseFloat(pricePerLiter).toFixed(2)}/L)</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-farm-sky rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">200L/dia</p>
                  <p className="font-bold text-farm-green">
                    R$ {(200 * parseFloat(pricePerLiter) * 30).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </p>
                </div>
                
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">250L/dia</p>
                  <p className="font-bold text-farm-green">
                    R$ {(250 * parseFloat(pricePerLiter) * 30).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </p>
                </div>
                
                <div className="p-3 bg-farm-sky rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">300L/dia</p>
                  <p className="font-bold text-farm-green">
                    R$ {(300 * parseFloat(pricePerLiter) * 30).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </p>
                </div>
                
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">350L/dia</p>
                  <p className="font-bold text-farm-green">
                    R$ {(350 * parseFloat(pricePerLiter) * 30).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Comparação de Preços</h4>
              {totalLiters && (
                <div className="space-y-2">
                  {[1.30, 1.40, 1.50, 1.60, 1.70].map(price => (
                    <div key={price} className="flex justify-between items-center p-2 bg-background rounded border">
                      <span className="text-sm">R$ {price.toFixed(2)}/L</span>
                      <span className="font-medium text-farm-green">
                        R$ {(parseFloat(totalLiters) * price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue History */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-farm-green">Histórico de Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Período</th>
                  <th className="text-right p-3">Litros</th>
                  <th className="text-right p-3">Preço/L</th>
                  <th className="text-right p-3">Receita Total</th>
                </tr>
              </thead>
              <tbody>
                {calculations.map((calculation) => (
                  <tr key={calculation.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">{calculation.period}</td>
                    <td className="text-right p-3">{calculation.totalLiters.toLocaleString('pt-BR')} L</td>
                    <td className="text-right p-3">R$ {calculation.pricePerLiter.toFixed(2)}</td>
                    <td className="text-right p-3 font-medium text-farm-green">
                      R$ {calculation.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;