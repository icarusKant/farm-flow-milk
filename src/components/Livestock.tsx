import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Users, Baby } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import cowIcon from "@/assets/cow-icon.jpg";

interface Animal {
  id: string;
  name: string;
  type: "vaca" | "touro" | "bezerro" | "bezerra";
  sex: "macho" | "femea";
  birthDate: string;
  motherName?: string;
  age: string;
}

const Livestock = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [animalName, setAnimalName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [animalSex, setAnimalSex] = useState("");
  const [motherName, setMotherName] = useState("");

  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: "1",
      name: "Mimosa",
      type: "vaca",
      sex: "femea",
      birthDate: "2020-03-15",
      age: "4 anos"
    },
    {
      id: "2",
      name: "Touro Rex",
      type: "touro",
      sex: "macho", 
      birthDate: "2019-08-20",
      age: "5 anos"
    },
    {
      id: "3",
      name: "Pequenina",
      type: "bezerra",
      sex: "femea",
      birthDate: "2024-01-10",
      motherName: "Mimosa",
      age: "20 dias"
    }
  ]);

  const calculateAge = (birthDate: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} dias`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
  };

  const handleAddAnimal = () => {
    if (animalName && animalType && animalSex && selectedDate) {
      const newAnimal: Animal = {
        id: Date.now().toString(),
        name: animalName,
        type: animalType as Animal['type'],
        sex: animalSex as Animal['sex'],
        birthDate: format(selectedDate, "yyyy-MM-dd"),
        motherName: motherName || undefined,
        age: calculateAge(selectedDate)
      };
      
      setAnimals([newAnimal, ...animals]);
      setAnimalName("");
      setAnimalType("");
      setAnimalSex("");
      setMotherName("");
    }
  };

  const stats = {
    total: animals.length,
    vacas: animals.filter(a => a.type === "vaca").length,
    touros: animals.filter(a => a.type === "touro").length,
    filhotes: animals.filter(a => a.type === "bezerro" || a.type === "bezerra").length
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-farm-green">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total de Animais</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-farm-green">{stats.vacas}</div>
            <p className="text-sm text-muted-foreground">Vacas</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-farm-green">{stats.touros}</div>
            <p className="text-sm text-muted-foreground">Touros</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-farm-green">{stats.filhotes}</div>
            <p className="text-sm text-muted-foreground">Filhotes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Animal Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Adicionar Animal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Animal</Label>
              <Input
                placeholder="Ex: Mimosa"
                value={animalName}
                onChange={(e) => setAnimalName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={animalType} onValueChange={setAnimalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vaca">Vaca</SelectItem>
                    <SelectItem value="touro">Touro</SelectItem>
                    <SelectItem value="bezerro">Bezerro</SelectItem>
                    <SelectItem value="bezerra">Bezerra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sexo</Label>
                <Select value={animalSex} onValueChange={setAnimalSex}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="femea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
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

            <div className="space-y-2">
              <Label>Nome da Mãe (opcional)</Label>
              <Input
                placeholder="Ex: Mimosa"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>

            <Button 
              variant="farm" 
              className="w-full" 
              onClick={handleAddAnimal}
              disabled={!animalName || !animalType || !animalSex || !selectedDate}
            >
              Adicionar ao Rebanho
            </Button>
          </CardContent>
        </Card>

        {/* Recent Births */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <Baby className="h-5 w-5" />
              Nascimentos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {animals
                .filter(animal => animal.type === "bezerro" || animal.type === "bezerra")
                .slice(0, 5)
                .map((animal) => (
                  <div key={animal.id} className="flex items-center space-x-3 p-3 bg-farm-sky rounded-lg">
                    <img src={cowIcon} alt="Cow" className="w-8 h-8 rounded" />
                    <div className="flex-1">
                      <p className="font-medium">{animal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {animal.motherName && `Filhote de ${animal.motherName} • `}
                        {animal.age}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-farm-green font-medium">
                        {animal.type === "bezerro" ? "♂" : "♀"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Animals List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-farm-green flex items-center gap-2">
            <Users className="h-5 w-5" />
            Rebanho Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animals.map((animal) => (
              <Card key={animal.id} className="border-2 hover:border-farm-green transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <img src={cowIcon} alt="Animal" className="w-10 h-10 rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-farm-green">{animal.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {animal.type} • {animal.sex}
                      </p>
                      <p className="text-xs text-muted-foreground">{animal.age}</p>
                      {animal.motherName && (
                        <p className="text-xs text-farm-green">Mãe: {animal.motherName}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Livestock;