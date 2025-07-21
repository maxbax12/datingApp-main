import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer = ({ children, className }: ResponsiveContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "min-h-screen flex flex-col w-full",
      isMobile 
        ? "max-w-sm mx-auto" 
        : "max-w-4xl mx-auto lg:max-w-5xl xl:max-w-6xl",
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;