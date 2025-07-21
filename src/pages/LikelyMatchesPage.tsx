import { useState } from "react";
import LikelyMatches from "@/components/dating/LikelyMatches";
import AIAvatarChat from "@/components/dating/AIAvatarChat";
import Navigation from "@/components/dating/Navigation";
import PageHeader from "@/components/dating/PageHeader";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain } from "lucide-react";

interface LikelyMatch {
  id: string;
  name: string;
  age: number;
  photo: string;
  compatibilityScore: number;
  aiReason: string;
  commonInterests: string[];
  distance: number;
  lastActive: string;
}

const LikelyMatchesPage = () => {
  const [selectedMatch, setSelectedMatch] = useState<LikelyMatch | null>(null);
  const [chatMode, setChatMode] = useState<"list" | "ai-chat">("list");

  const handleMatchDecision = (
    matchId: string,
    decision: "accept" | "decline",
  ) => {
    console.log(`Match ${matchId} ${decision}`);
    // Handle match decision logic
  };

  const handleChatWithAI = (match: LikelyMatch) => {
    setSelectedMatch(match);
    setChatMode("ai-chat");
  };

  const handleBackToList = () => {
    setChatMode("list");
    setSelectedMatch(null);
  };

  return (
    <ResponsiveContainer className="bg-gray-50 pb-safe-or-4">
      {chatMode === "ai-chat" && selectedMatch ? (
        // AI Chat View
        <div className="flex flex-col h-screen">
          <header className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
            <Button
              onClick={handleBackToList}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">
                Chat with {selectedMatch.name}'s AI
              </h2>
              <p className="text-sm text-purple-600">
                {selectedMatch.compatibilityScore}% compatibility
              </p>
            </div>
          </header>

          <div className="flex-1">
            <AIAvatarChat
              avatarName={selectedMatch.name}
              avatarImage={selectedMatch.photo}
              isOwnAvatar={false}
              profileOwnerName={selectedMatch.name}
            />
          </div>
        </div>
      ) : (
        // List View
        <div className="flex flex-col h-screen">
          <PageHeader 
            title="AI Likely Matches"
            rightElement={
              <Brain className="h-6 w-6 text-purple-500" />
            }
          />
          <div className="bg-white border-b border-gray-200 p-4">
            <p className="text-sm text-gray-600">
              AI-curated profiles with high compatibility potential
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <LikelyMatches
              onMatchDecision={handleMatchDecision}
              onChatWithAI={handleChatWithAI}
            />
          </div>

          <Navigation />
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default LikelyMatchesPage;
