import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { CattleData } from "@/data/mockData";

interface QuickActionsProps {
  cattleData: CattleData[];
}

export default function QuickActions({ cattleData }: QuickActionsProps) {
  const getStatusColor = (status: CattleData['status']) => {
    switch (status) {
      case 'grazing':
        return 'bg-green-100 text-green-700';
      case 'resting':
        return 'bg-blue-100 text-blue-700';
      case 'moving':
        return 'bg-yellow-100 text-yellow-700';
      case 'alert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-poppins">Quick Actions</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cattleData.map((cattle) => (
            <div key={cattle.id} className="p-4 bg-card/50 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{cattle.name}</h3>
                <Badge className={`text-xs ${getStatusColor(cattle.status)}`}>
                  {cattle.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">🔋</span>
                  <span className="font-medium">{cattle.batteryLevel}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">🕐</span>
                  <span className="font-medium">{cattle.lastUpdate}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="w-3 h-3 mr-2" />
                Manage
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}