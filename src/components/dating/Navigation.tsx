import { Heart, MessageCircle, User, Bot, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Heart, label: "Discover" },
    { path: "/likely-matches", icon: Brain, label: "AI Matches" },
    { path: "/matches", icon: MessageCircle, label: "Chats" },
    { path: "/ai-chat", icon: Bot, label: "Your AI" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 w-full">
      {/* Safe area for notched devices */}
      <div className="w-full px-2 pb-safe-or-2">
        <div className="flex items-center justify-around h-16 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center min-h-[60px] flex-1 transition-all duration-200 active:scale-95",
                  "touch-manipulation", // Optimizes touch interactions
                  isActive
                    ? "text-pink-500"
                    : "text-gray-400 hover:text-gray-600 active:text-pink-400",
                )}
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-center space-y-1 px-1 py-2 rounded-lg transition-all duration-200",
                    isActive && "bg-pink-50",
                  )}
                >
                  <Icon
                    className={cn(
                      "transition-all duration-200",
                      isActive ? "h-6 w-6" : "h-5 w-5",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-medium transition-all duration-200 text-center leading-tight",
                      isActive ? "text-pink-600" : "text-gray-500",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
