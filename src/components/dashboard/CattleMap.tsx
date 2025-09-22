import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize2, Filter } from "lucide-react";
import { CattleData } from "@/data/mockData";
import farmHero from "@/assets/farm-hero.jpg";

interface CattleMapProps {
  cattleData: CattleData[];
}

export default function CattleMap({ cattleData }: CattleMapProps) {
  const getStatusColor = (status: CattleData['status']) => {
    switch (status) {
      case 'grazing':
        return 'bg-success text-success-foreground';
      case 'resting':
        return 'bg-secondary text-secondary-foreground';
      case 'moving':
        return 'bg-primary text-primary-foreground';
      case 'alert':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: CattleData['status']) => {
    switch (status) {
      case 'grazing':
        return '🌿 Grazing';
      case 'resting':
        return '😴 Resting';
      case 'moving':
        return '🚶 Moving';
      case 'alert':
        return '⚠️ Alert';
      default:
        return status;
    }
  };

  // Group cattle by status for the legend
  const statusCounts = cattleData.reduce((acc, cattle) => {
    acc[cattle.status] = (acc[cattle.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-poppins">
            Cattle Location Map
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Map Container */}
        <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
          {/* Background farm image */}
          <img 
            src={farmHero} 
            alt="Farm Map" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with opacity */}
          <div className="absolute inset-0 bg-background/60" />
          
          {/* Cattle markers positioned randomly across the map */}
          {cattleData.map((cattle, index) => {
            // Create consistent but random positions for demo
            const positions = [
              { top: '20%', left: '25%' },
              { top: '45%', left: '60%' },
              { top: '35%', left: '80%' },
              { top: '65%', left: '40%' },
              { top: '55%', left: '15%' }
            ];
            const position = positions[index % positions.length];
            
            return (
              <div
                key={cattle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: position.top, left: position.left }}
              >
                <div className={`w-8 h-8 rounded-full ${getStatusColor(cattle.status)} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                  <MapPin className="w-4 h-4" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-popover border border-border rounded-lg p-3 shadow-lg min-w-40">
                    <p className="font-semibold text-sm">{cattle.name}</p>
                    <p className="text-xs text-muted-foreground">{cattle.tagNumber}</p>
                    <Badge className={`mt-1 text-xs ${getStatusColor(cattle.status)}`}>
                      {getStatusLabel(cattle.status)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Battery: {cattle.batteryLevel}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Status Legend</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status as CattleData['status'])}`} />
                <span className="text-xs text-muted-foreground">
                  {getStatusLabel(status as CattleData['status'])} ({count})
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <MapPin className="w-4 h-4 mr-2" />
          View Full Map
        </Button>
      </CardContent>
    </Card>
  );
}