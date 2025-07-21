import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  showSettingsButton?: boolean;
  rightElement?: React.ReactNode;
  isMainTitle?: boolean;
}

const PageHeader = ({ title, showSettingsButton = true, rightElement, isMainTitle = false }: PageHeaderProps) => {
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4 h-16 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="text-gray-600 hover:text-red-600"
      >
        <LogOut className="h-4 w-4" />
      </Button>

      {isMainTitle ? (
        <div className="flex items-center space-x-2 overflow-hidden">
          <img 
            src="/wingmatch.png" 
            alt="WingMatch" 
            className="h-20 w-auto"
          />
        </div>
      ) : (
        <h1 className="text-xl font-bold text-gray-900">
          {title}
        </h1>
      )}

      {rightElement || (showSettingsButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSettings}
          className="text-gray-600 hover:text-gray-800"
        >
          <Settings className="h-4 w-4" />
        </Button>
      ))}
    </header>
  );
};

export default PageHeader;