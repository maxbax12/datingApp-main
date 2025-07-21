import { useState } from "react";
import ChatList from "@/components/dating/ChatList";
import Navigation from "@/components/dating/Navigation";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Video, Phone, Send, Smile } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! Thanks for the match 😊",
    sender: "other",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    text: "Hi Emma! Nice to meet you! I love your photos",
    sender: "me",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "Aww thank you! I saw you're into hiking too. Have any favorite trails?",
    sender: "other",
    timestamp: "10:35 AM",
  },
  {
    id: "4",
    text: "Yes! I love the trail at Sunset Peak. The views are incredible. Would you like to check it out together sometime?",
    sender: "me",
    timestamp: "10:37 AM",
  },
  {
    id: "5",
    text: "That sounds amazing! I'd love to 🥾✨",
    sender: "other",
    timestamp: "10:39 AM",
  },
];

const Matches = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const isMobile = useIsMobile();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ResponsiveContainer className="bg-white pb-safe-or-4">
      {selectedMatch ? (
        // Chat View
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex items-center space-x-3">
            <Button
              onClick={() => setSelectedMatch(null)}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedMatch.photo} alt={selectedMatch.name} />
              <AvatarFallback>{selectedMatch.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">
                {selectedMatch.name}
              </h2>
              <p className="text-sm text-green-500">Online now</p>
            </div>

            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Video className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Phone className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me"
                        ? "text-pink-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="pr-12 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <Smile className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="rounded-full bg-pink-500 hover:bg-pink-600 w-10 h-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Matches List View
        <div className={cn(
          "flex h-screen",
          !isMobile && "max-w-4xl mx-auto"
        )}>
          <div className={cn(
            "flex flex-col",
            isMobile ? "w-full" : "w-full"
          )}>
            <ChatList onChatSelect={setSelectedMatch} />
            <Navigation />
          </div>
        </div>
      )}
    </ResponsiveContainer>
  );
};

export default Matches;
