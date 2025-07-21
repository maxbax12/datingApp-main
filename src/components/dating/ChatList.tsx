import { useState } from "react";
import { MessageCircle, Heart, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/dating/PageHeader";

interface Match {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatListProps {
  onChatSelect?: (match: Match) => void;
}

const mockMatches: Match[] = [
  {
    id: "1",
    name: "Emma",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Hey! Thanks for the match 😊",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Sofia",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Would love to grab coffee sometime!",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Maya",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    lastMessage: "That hiking trail looks amazing!",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "4",
    name: "Aria",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    lastMessage: "I love your art! So talented 🎨",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: false,
  },
];

const ChatList = ({ onChatSelect }: ChatListProps) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleChatClick = (match: Match) => {
    setSelectedChat(match.id);
    onChatSelect?.(match);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <PageHeader title="Messages" />
      
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-pink-100 text-pink-700">
            {mockMatches.filter((m) => m.unreadCount > 0).length} new
          </Badge>
          <Badge variant="outline">
            {mockMatches.filter((m) => m.isOnline).length} online
          </Badge>
        </div>
      </div>

      {/* Match List */}
      <div className="flex-1 overflow-y-auto">
        {mockMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No matches yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start swiping to find your perfect match!
            </p>
            <Button variant="outline" className="text-pink-500 border-pink-500">
              <Heart className="h-4 w-4 mr-2" />
              Start Swiping
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {mockMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => handleChatClick(match)}
                className={cn(
                  "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                  selectedChat === match.id && "bg-pink-50",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={match.photo} alt={match.name} />
                      <AvatarFallback>{match.name[0]}</AvatarFallback>
                    </Avatar>
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {match.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {match.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {match.lastMessage}
                    </p>
                  </div>

                  {match.unreadCount > 0 && (
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-pink-500 text-white text-xs">
                        {match.unreadCount}
                      </Badge>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
