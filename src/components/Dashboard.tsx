import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Droplets, TrendingUp, Calendar } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

const Dashboard = () => {
  const stats = [
    {
      title: "Produção Hoje",
      value: "245 L",
      icon: Droplets,
      change: "+5.2%",
    },
    {
      title: "Total do Rebanho",
      value: "42",
      icon: Users,
      change: "+2",
    },
    {
      title: "Receita Mensal",
      value: "R$ 3.240",
      icon: TrendingUp,
      change: "+12.5%",
    },
    {
      title: "Última Atualização",
      value: "Hoje",
      icon: Calendar,
      change: "08:30",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden h-48">
        <img 
          src={farmHero} 
          alt="Farm landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-farm-green/80 to-transparent flex items-center">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Bem-vindo ao FarManage</h1>
            <p className="text-lg opacity-90">Gerencie sua fazenda com eficiência e precisão</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-farm transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-farm-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-farm-green">{stat.value}</div>
                <p className="text-xs text-farm-green-light">
                  {stat.change} desde ontem
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-farm-sky rounded-lg">
              <span>Registrar Produção de Leite</span>
              <Droplets className="h-5 w-5 text-farm-green" />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span>Adicionar Animal ao Rebanho</span>
              <Users className="h-5 w-5 text-farm-green" />
            </div>
            <div className="flex items-center justify-between p-3 bg-farm-sky rounded-lg">
              <span>Calcular Receitas</span>
              <TrendingUp className="h-5 w-5 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green">Resumo da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Produção Total:</span>
                <span className="font-medium">1.680 L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Média Diária:</span>
                <span className="font-medium">240 L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Receita Estimada:</span>
                <span className="font-medium text-farm-green">R$ 2.520</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Novos Nascimentos:</span>
                <span className="font-medium">3 bezerros</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;