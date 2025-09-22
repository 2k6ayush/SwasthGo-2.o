import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

export default function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { value: "english", label: "English (English)" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "bengali", label: "বাংলা (Bengali)" }
  ];

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold text-primary font-poppins">
            SwasthGo
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Welcome! Select your language.
          </p>
        </div>

        {/* Language Selection Card */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-primary text-center">
            Select Language
          </h2>
          
          <div className="space-y-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose your language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleContinue}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}