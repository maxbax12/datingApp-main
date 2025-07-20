import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import SwipeContainer from "@/components/dating/SwipeContainer";
import Navigation from "@/components/dating/Navigation";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col max-w-md mx-auto pb-safe-or-4">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
        </Button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          LoveSync
        </h1>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => (window.location.href = "/settings")}
          className="text-gray-600 hover:text-gray-800"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </header>

      {/* Main Content - Swipe Area */}
      <SwipeContainer />

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
