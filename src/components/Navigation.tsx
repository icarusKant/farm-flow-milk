import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, BarChart3, Calculator, HelpCircle, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "milk", label: "Produção Leiteira", icon: BarChart3 },
    { id: "livestock", label: "Rebanho", icon: Users },
    { id: "revenue", label: "Receitas", icon: Calculator },
    { id: "support", label: "Suporte", icon: HelpCircle },
  ];

  return (
    <Card className="p-4 shadow-farm">
      <nav className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-farm-green mb-4">FarManage</h2>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "farm" : "ghost"}
              className={cn(
                "justify-start",
                activeTab === item.id && "bg-gradient-to-r from-farm-green to-farm-green-light"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </Card>
  );
};

export default Navigation;