import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import LanguageSelection from "@/pages/LanguageSelection";
import Home from "@/pages/Home";
import CattleMap from "@/pages/CattleMap";
import GrazingStats from "@/pages/GrazingStats";
import ManageDevices from "@/pages/ManageDevices";
import BottomNavigation from "@/components/layout/BottomNavigation";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("home");

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "cattle-map":
        return <CattleMap />;
      case "grazing-stats":
        return <GrazingStats />;
      case "manage-devices":
        return <ManageDevices />;
      case "help":
        return <div className="min-h-screen bg-background pb-20 p-4">
          <h1 className="text-2xl font-bold text-primary mb-4">Help & Support</h1>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>;
      default:
        return <Home />;
    }
  };

  if (!selectedLanguage) {
    return <LanguageSelection onLanguageSelect={handleLanguageSelect} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentPage()}
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <Toaster />
    </div>
  );
}

export default App;
