import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "question" | "response" | "insight";
}

interface AIAvatarChatProps {
  avatarName: string;
  avatarImage?: string;
  isOwnAvatar: boolean;
  profileOwnerName?: string;
  onClose?: () => void;
}

const mockAIResponses = [
  "That's really interesting! What draws you most to that hobby?",
  "I can see why that would be important to you. How long have you felt this way?",
  "That sounds like a great experience! What did you learn from it?",
  "I'd love to know more about that. Can you tell me what that means to you?",
  "That's a unique perspective! What influenced you to think that way?",
];

const mockAIQuestions = [
  "What's something you're passionate about that most people don't know?",
  "If you could have dinner with anyone, who would it be and why?",
  "What's a relationship deal-breaker for you?",
  "What does your ideal weekend look like?",
  "What's something you've learned about yourself recently?",
];

const AIAvatarChat = ({
  avatarName,
  avatarImage,
  isOwnAvatar,
  profileOwnerName,
  onClose,
}: AIAvatarChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: isOwnAvatar
        ? "Hi! I'm here to help you build a better dating profile by getting to know you better. Ready for today's questions?"
        : `Hi! I'm ${profileOwnerName}'s AI avatar. I'd love to learn about you and see if you two might be compatible. What would you like to know about ${profileOwnerName}?`,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "question",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [learningProgress, setLearningProgress] = useState(73);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: isOwnAvatar
            ? mockAIResponses[
                Math.floor(Math.random() * mockAIResponses.length)
              ]
            : `Based on what you've shared, I think you and ${profileOwnerName} might have some interesting things in common. ${mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "response",
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);

        if (isOwnAvatar) {
          setLearningProgress((prev) =>
            Math.min(100, prev + Math.random() * 3),
          );
        }

        // Sometimes ask a follow-up question
        if (Math.random() > 0.6) {
          setTimeout(() => {
            const followUp: Message = {
              id: (Date.now() + 2).toString(),
              text: mockAIQuestions[
                Math.floor(Math.random() * mockAIQuestions.length)
              ],
              sender: "ai",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: "question",
            };
            setMessages((prev) => [...prev, followUp]);
          }, 2000);
        }
      },
      1500 + Math.random() * 1000,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  avatarImage ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                }
                alt={avatarName}
              />
              <AvatarFallback>
                <Bot className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 border-2 border-white rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{avatarName} AI</h2>
            <p className="text-sm text-purple-600">
              {isOwnAvatar
                ? "Your Personal AI"
                : `${profileOwnerName}'s AI Avatar`}
            </p>
          </div>

          {isOwnAvatar && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700"
            >
              {learningProgress}% learned
            </Badge>
          )}
        </div>

        {isOwnAvatar && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${learningProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : message.type === "question"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 border border-purple-200"
                    : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.sender === "ai" && message.type === "question" && (
                <div className="flex items-center space-x-1 mb-2">
                  <Sparkles className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600">
                    AI Question
                  </span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 max-w-xs px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isOwnAvatar
                  ? "Share something about yourself..."
                  : "Ask about their interests..."
              }
              className="pr-12 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTyping}
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-10 h-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAvatarChat;
