import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Droplets } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ProductionRecord {
  id: string;
  date: string;
  morning: number;
  afternoon: number;
  total: number;
}

const MilkProduction = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [morningProduction, setMorningProduction] = useState("");
  const [afternoonProduction, setAfternoonProduction] = useState("");
  
  const [productions, setProductions] = useState<ProductionRecord[]>([
    {
      id: "1",
      date: "2024-01-30",
      morning: 120,
      afternoon: 125,
      total: 245
    },
    {
      id: "2", 
      date: "2024-01-29",
      morning: 115,
      afternoon: 120,
      total: 235
    },
    {
      id: "3",
      date: "2024-01-28", 
      morning: 130,
      afternoon: 110,
      total: 240
    }
  ]);

  const handleAddProduction = () => {
    const morning = parseFloat(morningProduction) || 0;
    const afternoon = parseFloat(afternoonProduction) || 0;
    const total = morning + afternoon;
    
    if (selectedDate && total > 0) {
      const newProduction: ProductionRecord = {
        id: Date.now().toString(),
        date: format(selectedDate, "yyyy-MM-dd"),
        morning,
        afternoon,
        total
      };
      
      setProductions([newProduction, ...productions]);
      setMorningProduction("");
      setAfternoonProduction("");
    }
  };

  const totalWeekProduction = productions.slice(0, 7).reduce((sum, prod) => sum + prod.total, 0);
  const averageDaily = totalWeekProduction / Math.min(7, productions.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Production Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Registrar Produção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Manhã (L)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={morningProduction}
                  onChange={(e) => setMorningProduction(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tarde (L)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={afternoonProduction}
                  onChange={(e) => setAfternoonProduction(e.target.value)}
                />
              </div>
            </div>

            <div className="text-center p-4 bg-farm-sky rounded-lg">
              <p className="text-sm text-muted-foreground">Total do Dia</p>
              <p className="text-2xl font-bold text-farm-green">
                {(parseFloat(morningProduction) || 0) + (parseFloat(afternoonProduction) || 0)} L
              </p>
            </div>

            <Button 
              variant="farm" 
              className="w-full" 
              onClick={handleAddProduction}
              disabled={!selectedDate || (!morningProduction && !afternoonProduction)}
            >
              Registrar Produção
            </Button>
          </CardContent>
        </Card>

        {/* Production Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Resumo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Total da Semana</p>
                <p className="text-xl font-bold text-farm-green">{totalWeekProduction.toFixed(1)} L</p>
              </div>
              <div className="text-center p-4 bg-farm-sky rounded-lg">
                <p className="text-sm text-muted-foreground">Média Diária</p>
                <p className="text-xl font-bold text-farm-green">{averageDaily.toFixed(1)} L</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-farm-green">Últimos Registros</h4>
              {productions.slice(0, 5).map((production) => (
                <div key={production.id} className="flex justify-between items-center p-2 bg-background rounded border">
                  <span className="text-sm">{format(new Date(production.date), "dd/MM/yyyy")}</span>
                  <div className="text-right">
                    <span className="font-medium">{production.total} L</span>
                    <p className="text-xs text-muted-foreground">
                      {production.morning}L + {production.afternoon}L
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production History Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-farm-green">Histórico de Produção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Data</th>
                  <th className="text-right p-2">Manhã (L)</th>
                  <th className="text-right p-2">Tarde (L)</th>
                  <th className="text-right p-2">Total (L)</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((production) => (
                  <tr key={production.id} className="border-b">
                    <td className="p-2">{format(new Date(production.date), "dd/MM/yyyy")}</td>
                    <td className="text-right p-2">{production.morning}</td>
                    <td className="text-right p-2">{production.afternoon}</td>
                    <td className="text-right p-2 font-medium text-farm-green">{production.total}</td>
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

export default MilkProduction;