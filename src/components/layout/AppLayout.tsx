import { useState } from "react";
import { Outlet } from "react-router-dom";
import { 
  Home, 
  MapPin, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Menu,
  Globe,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import cowIcon from "@/assets/cow-icon.png";

const navigation = [
  { title: "Home", icon: Home, route: "/", active: true },
  { title: "Cattle Map", icon: MapPin, route: "/live-map" },
  { title: "Grazing Stats", icon: BarChart3, route: "/grazing" },
  { title: "Manage Devices", icon: Settings, route: "/devices" },
  { title: "Help", icon: HelpCircle, route: "/help" },
];

const languages = [
  "English", "हिंदी", "தமிழ்", "తెలుగు", "मराठी", "ಕನ್ನಡ", "বাংলা"
];

export default function AppLayout() {
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <img src={cowIcon} alt="CattleTrack" className="w-8 h-8" />
              <div>
                <h1 className="font-poppins font-semibold text-lg text-foreground">
                  CattleTrack
                </h1>
                <p className="text-xs text-muted-foreground">Farmer Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.route}
                    variant={item.active ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </Button>
                );
              })}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentLanguage}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setCurrentLanguage(lang)}
                      className={lang === currentLanguage ? "bg-accent" : ""}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <Card className="mt-2 p-2 md:hidden">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.route}
                      variant={item.active ? "default" : "ghost"}
                      size="sm"
                      className="justify-start gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </Button>
                  );
                })}
              </nav>
            </Card>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}