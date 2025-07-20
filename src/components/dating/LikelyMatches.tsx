import { useState } from "react";
import { Heart, MessageCircle, Brain, Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

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

const mockLikelyMatches: LikelyMatch[] = [
  {
    id: "1",
    name: "Sofia",
    age: 27,
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
    compatibilityScore: 94,
    aiReason:
      "Both creative professionals who love hiking and have similar communication styles. High potential for meaningful connection.",
    commonInterests: ["Photography", "Hiking", "Coffee", "Art"],
    distance: 3,
    lastActive: "Active now",
  },
  {
    id: "2",
    name: "Maya",
    age: 25,
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
    compatibilityScore: 89,
    aiReason:
      "Shared values around fitness and outdoor activities. Both prefer authentic conversations over small talk.",
    commonInterests: ["Fitness", "Outdoor Adventures", "Dogs", "Cooking"],
    distance: 5,
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Luna",
    age: 26,
    photo:
      "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=600&fit=crop&crop=face",
    compatibilityScore: 86,
    aiReason:
      "Tech background with creative hobbies. Similar life goals and relationship expectations.",
    commonInterests: ["Technology", "Dancing", "Travel", "Food"],
    distance: 7,
    lastActive: "1 day ago",
  },
];

interface LikelyMatchesProps {
  onMatchDecision: (matchId: string, decision: "accept" | "decline") => void;
  onChatWithAI: (match: LikelyMatch) => void;
}

const LikelyMatches = ({
  onMatchDecision,
  onChatWithAI,
}: LikelyMatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<LikelyMatch | null>(null);

  const handleMatchDecision = (
    match: LikelyMatch,
    decision: "accept" | "decline",
  ) => {
    onMatchDecision(match.id, decision);
    setSelectedMatch(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-gray-600 bg-gray-100";
  };

  if (mockLikelyMatches.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="h-16 w-16 text-purple-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No likely matches yet
        </h3>
        <p className="text-gray-500 mb-4">
          Keep swiping and chatting with your AI to improve match predictions!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">Likely Matches</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Curated
        </Badge>
      </div>

      {mockLikelyMatches.map((match) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Card className="overflow-hidden border-2 border-purple-100 hover:border-purple-200 transition-colors">
            <CardContent className="p-0">
              <div className="flex">
                {/* Photo */}
                <div className="w-24 h-24 relative">
                  <img
                    src={match.photo}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge
                      className={`text-xs ${getScoreColor(match.compatibilityScore)}`}
                    >
                      {match.compatibilityScore}%
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {match.name}, {match.age}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {match.distance} km away • {match.lastActive}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    <Brain className="h-3 w-3 inline mr-1 text-purple-500" />
                    {match.aiReason}
                  </p>

                  {/* Common Interests */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {match.commonInterests.slice(0, 3).map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                    {match.commonInterests.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{match.commonInterests.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => onChatWithAI(match)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat with AI
                    </Button>

                    <Button
                      onClick={() => handleMatchDecision(match, "decline")}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    <Button
                      onClick={() => handleMatchDecision(match, "accept")}
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default LikelyMatches;
