import { Home, MapPin, BarChart3, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { 
      id: "home", 
      label: "Home", 
      icon: Home 
    },
    { 
      id: "cattle-map", 
      label: "Cattle Map", 
      icon: MapPin 
    },
    { 
      id: "grazing-stats", 
      label: "Grazing Stats", 
      icon: BarChart3 
    },
    { 
      id: "manage-devices", 
      label: "Manage Devices", 
      icon: Settings 
    },
    { 
      id: "help", 
      label: "Help", 
      icon: HelpCircle 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}