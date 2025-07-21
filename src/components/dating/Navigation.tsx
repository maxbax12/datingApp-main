import { Heart, MessageCircle, User, Bot, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/", icon: Heart, label: "Discover" },
    { path: "/likely-matches", icon: Brain, label: "AI Matches" },
    { path: "/matches", icon: MessageCircle, label: "Chats" },
    { path: "/ai-chat", icon: Bot, label: "Your AI" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50",
      isMobile 
        ? "left-0 right-0 w-full" 
        : "left-1/2 transform -translate-x-1/2 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl"
    )}>
      {/* Safe area for notched devices */}
      <div className={cn(
        "w-full px-2",
        isMobile ? "pb-safe-or-2" : "pb-2"
      )}>
        <div className={cn(
          "flex items-center justify-around w-full",
          isMobile ? "h-16" : "h-12"
        )}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 transition-all duration-200",
                  isMobile && "min-h-[60px] active:scale-95 touch-manipulation",
                  !isMobile && "min-h-[48px] hover:scale-105",
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
                      isMobile
                        ? isActive ? "h-6 w-6" : "h-5 w-5"
                        : isActive ? "h-5 w-5" : "h-4 w-4",
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium transition-all duration-200 text-center leading-tight",
                      isMobile ? "text-xs" : "text-xs",
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
