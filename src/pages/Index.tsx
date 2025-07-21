import { useState } from "react";
import SwipeContainer from "@/components/dating/SwipeContainer";
import Navigation from "@/components/dating/Navigation";
import PageHeader from "@/components/dating/PageHeader";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <ResponsiveContainer className={cn(
      "bg-gradient-to-br from-pink-50 to-purple-50",
      isMobile ? "pb-safe-or-4" : "pb-16"
    )}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <PageHeader title="WingMatch" isMainTitle={true} />
      </div>

      {/* Main Content - Swipe Area */}
      <div className="flex-1 relative min-h-0 w-full">
        <SwipeContainer />
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </ResponsiveContainer>
  );
};

export default Index;
