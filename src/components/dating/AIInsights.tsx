import { TrendingUp, Users, Heart, Brain, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Insight {
  id: string;
  type: "preference" | "compatibility" | "suggestion" | "learning";
  title: string;
  description: string;
  confidence: number;
  action?: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    type: "preference",
    title: "You prefer outdoorsy profiles",
    description:
      "Based on your swipes, you're 73% more likely to like profiles mentioning hiking, camping, or outdoor activities.",
    confidence: 87,
    action: "Show more outdoor enthusiasts",
  },
  {
    id: "2",
    type: "compatibility",
    title: "High compatibility patterns found",
    description:
      "Profiles with creative careers and similar music taste show 91% compatibility match with your preferences.",
    confidence: 91,
  },
  {
    id: "3",
    type: "suggestion",
    title: "Profile optimization suggestion",
    description:
      "Adding more photos of your hobbies could increase your match rate by up to 34%.",
    confidence: 76,
    action: "Update photos",
  },
  {
    id: "4",
    type: "learning",
    title: "Communication style learned",
    description:
      "Your AI has learned you prefer meaningful conversations over small talk. This will help filter better matches.",
    confidence: 82,
  },
];

const AIInsights = () => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "preference":
        return Heart;
      case "compatibility":
        return Users;
      case "suggestion":
        return Target;
      case "learning":
        return Brain;
      default:
        return TrendingUp;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "preference":
        return "text-pink-500 bg-pink-100";
      case "compatibility":
        return "text-purple-500 bg-purple-100";
      case "suggestion":
        return "text-blue-500 bg-blue-100";
      case "learning":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Brain className="h-5 w-5 text-purple-500" />
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          <Zap className="h-3 w-3 mr-1" />
          Updated
        </Badge>
      </div>

      {mockInsights.map((insight) => {
        const Icon = getInsightIcon(insight.type);
        const colorClasses = getInsightColor(insight.type);

        return (
          <Card key={insight.id} className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${colorClasses}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {insight.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confident
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{insight.description}</p>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Confidence</span>
                    <Progress
                      value={insight.confidence}
                      className="flex-1 h-1"
                    />
                    <span className="text-xs text-gray-500">
                      {insight.confidence}%
                    </span>
                  </div>

                  {insight.action && (
                    <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AIInsights;
