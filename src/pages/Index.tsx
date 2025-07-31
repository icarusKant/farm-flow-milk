import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import MilkProduction from "@/components/MilkProduction";
import Livestock from "@/components/Livestock";
import Revenue from "@/components/Revenue";
import Support from "@/components/Support";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "milk":
        return <MilkProduction />;
      case "livestock":
        return <Livestock />;
      case "revenue":
        return <Revenue />;
      case "support":
        return <Support />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-farm-sky/20">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
