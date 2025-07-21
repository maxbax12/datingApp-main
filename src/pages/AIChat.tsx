import { useState } from "react";
import AIAvatarChat from "@/components/dating/AIAvatarChat";
import AIInsights from "@/components/dating/AIInsights";
import AIProfileSetup from "@/components/dating/AIProfileSetup";
import Navigation from "@/components/dating/Navigation";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bot, Brain, BarChart3, RotateCcw, FileText, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AIChat = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      logout();
    }
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleQuestionnaireComplete = () => {
    setShowQuestionnaire(false);
    // Update user data to reflect questionnaire completion
    const currentUser = JSON.parse(
      localStorage.getItem("wingmatch_user") || "{}",
    );
    const updatedUser = { ...currentUser, aiSetupCompleted: true };
    localStorage.setItem("wingmatch_user", JSON.stringify(updatedUser));
  };

  if (showQuestionnaire) {
    return (
      <div className="min-h-screen">
        <AIProfileSetup onComplete={handleQuestionnaireComplete} />
      </div>
    );
  }

  return (
    <ResponsiveContainer className="bg-gray-50 pb-safe-or-4">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Your AI Assistant</h1>
              <p className="text-sm opacity-90">Learning about you daily</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQuestionnaire(true)}
              className="text-white/80 hover:text-white hover:bg-white/20"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettings}
              className="text-white/80 hover:text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex-1 flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <Bot className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="flex items-center space-x-2"
            >
              <Brain className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 m-0">
            <div className="h-full">
              <AIAvatarChat avatarName="Alex" isOwnAvatar={true} />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="flex-1 m-4 space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-purple-500" />
                  <span>AI Training</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowQuestionnaire(true)}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Retake Initial Questionnaire
                </Button>
                <p className="text-sm text-gray-600">
                  Redo the questionnaire to update your AI's understanding of
                  your preferences and personality.
                </p>
              </CardContent>
            </Card>

            <AIInsights />
          </TabsContent>
        </Tabs>
      </div>

      <Navigation />
    </ResponsiveContainer>
  );
};
export default AIChat;
