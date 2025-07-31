import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, BookOpen, Video, MessageCircle, Download } from "lucide-react";
import milkDashboard from "@/assets/milk-dashboard.jpg";

const Support = () => {
  const tutorials = [
    {
      title: "Como Registrar Produção de Leite",
      description: "Aprenda a registrar a produção diária de leite da sua fazenda",
      duration: "5 min",
      type: "video"
    },
    {
      title: "Gerenciamento de Rebanho",
      description: "Como adicionar e acompanhar animais no sistema",
      duration: "8 min", 
      type: "video"
    },
    {
      title: "Calculadora de Receitas",
      description: "Como usar a calculadora para projetar receitas",
      duration: "3 min",
      type: "tutorial"
    },
    {
      title: "Relatórios e Análises",
      description: "Extraindo insights dos seus dados de produção",
      duration: "10 min",
      type: "guide"
    }
  ];

  const faqs = [
    {
      question: "Como posso alterar o preço do leite?",
      answer: "Acesse a seção 'Receitas' e digite o novo preço por litro na calculadora. O sistema atualizará automaticamente todos os cálculos."
    },
    {
      question: "Posso registrar produção de dias anteriores?",
      answer: "Sim! Na seção 'Produção Leiteira', selecione a data desejada no calendário antes de inserir os dados."
    },
    {
      question: "Como adicionar informações sobre a mãe de um animal?",
      answer: "Ao registrar um novo animal na seção 'Rebanho', há um campo opcional 'Nome da Mãe' onde você pode inserir essa informação."
    },
    {
      question: "O sistema calcula automaticamente a idade dos animais?",
      answer: "Sim! Com base na data de nascimento, o sistema calcula e exibe automaticamente a idade atual de cada animal."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img src={milkDashboard} alt="Dashboard" className="w-16 h-16 rounded-lg" />
            <div>
              <h1 className="text-2xl font-bold text-farm-green">Central de Suporte FarManage</h1>
              <p className="text-muted-foreground">
                Encontre tutoriais, guias e respostas para suas dúvidas sobre o sistema
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card hover:shadow-farm transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Tutoriais em Vídeo</h3>
            <p className="text-sm text-muted-foreground">
              Aprenda rapidamente com nossos vídeos explicativos
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-farm transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Guia do Usuário</h3>
            <p className="text-sm text-muted-foreground">
              Manual completo com todas as funcionalidades
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-farm transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-farm-green mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Contato Direto</h3>
            <p className="text-sm text-muted-foreground">
              Fale conosco para dúvidas específicas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tutorials */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Tutoriais e Guias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-farm-sky rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                <div className="p-2 bg-farm-green rounded-full">
                  {tutorial.type === "video" && <Video className="h-4 w-4 text-white" />}
                  {tutorial.type === "tutorial" && <HelpCircle className="h-4 w-4 text-white" />}
                  {tutorial.type === "guide" && <BookOpen className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-farm-green">{tutorial.title}</h4>
                  <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                  <p className="text-xs text-farm-green mt-1">{tutorial.duration} de leitura</p>
                </div>
              </div>
            ))}
            
            <Button variant="farm" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Baixar Manual Completo (PDF)
            </Button>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-farm-green flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium text-farm-green mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Getting Started */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-farm-green">Primeiros Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-farm-green text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Configure Seu Rebanho</h3>
              <p className="text-sm text-muted-foreground">
                Comece adicionando os animais da sua fazenda na seção 'Rebanho'
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-farm-green text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Registre a Produção</h3>
              <p className="text-sm text-muted-foreground">
                Digite a produção diária de leite na seção 'Produção Leiteira'
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-farm-green text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Calcule Receitas</h3>
              <p className="text-sm text-muted-foreground">
                Use a calculadora de receitas para projetar seus ganhos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="shadow-card bg-gradient-to-r from-farm-green to-farm-green-light text-white">
        <CardContent className="p-6 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-xl font-bold mb-2">Ainda tem dúvidas?</h3>
          <p className="mb-4 opacity-90">
            Nossa equipe está pronta para ajudar você a aproveitar ao máximo o FarManage
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary">
              📧 suporte@farmanage.com
            </Button>
            <Button variant="secondary">
              📱 (11) 9999-9999
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;