import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Minus, Clock, AlertTriangle, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCattleData, mockAlerts } from "@/data/mockData";

export default function Home() {
  const [alerts, setAlerts] = useState(mockAlerts);

  // Calculate stats
  const currentlyGrazing = mockCattleData.filter(c => c.status === 'grazing').length;
  const totalGrazingHours = mockCattleData.reduce((sum, cattle) => sum + cattle.grazingHours, 0);
  const activeAlerts = alerts.filter(a => !a.resolved).length;

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'grazing':
        return 'bg-success border-white';
      case 'resting':
        return 'bg-info border-white';
      case 'moving':
        return 'bg-warning border-white';
      case 'alert':
        return 'bg-destructive border-white';
      default:
        return 'bg-muted border-white';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">My Farm</h1>
        <p className="text-muted-foreground mb-1">Hello, Farmer!</p>
        <p className="text-xs text-muted-foreground">Haryana, India • 25 acres</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-success rounded-full" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{currentlyGrazing}</div>
                <div className="text-sm text-muted-foreground">Cattle Grazing Now</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{totalGrazingHours.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">Today's Grazing Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{activeAlerts}</div>
                <div className="text-sm text-muted-foreground">Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Cattle Locations */}
      <Card className="mb-6">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Live Cattle Locations</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Geofence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Click on markers to view detailed information
          </p>
        </div>
        
        <CardContent className="p-4">
          <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border-2 border-border">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-70">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Roads */}
                <path d="M0 150 L400 150" stroke="#D1D5DB" strokeWidth="3" />
                <path d="M200 0 L200 300" stroke="#D1D5DB" strokeWidth="3" />
                <path d="M0 100 L400 100" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M0 200 L400 200" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M100 0 L100 300" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M300 0 L300 300" stroke="#E5E7EB" strokeWidth="2" />
                
                {/* Areas */}
                <rect x="20" y="20" width="80" height="60" fill="#F3F4F6" stroke="#D1D5DB" />
                <text x="60" y="55" textAnchor="middle" fontSize="10" fill="#6B7280">rch Road</text>
                
                <rect x="320" y="20" width="60" height="40" fill="#F3F4F6" stroke="#D1D5DB" />
                <text x="350" y="45" textAnchor="middle" fontSize="8" fill="#6B7280">New Parliament House</text>
              </svg>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                <Plus className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            {/* Geofence Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-dashed border-primary/60 rounded-full" />
            </div>

            {/* Cattle Markers */}
            {mockCattleData.map((cattle, index) => {
              const positions = [
                { top: '45%', left: '35%' },
                { top: '55%', left: '50%' },
                { top: '40%', left: '65%' },
                { top: '60%', left: '40%' },
                { top: '50%', left: '30%' }
              ];
              const position = positions[index % positions.length];
              
              return (
                <div
                  key={cattle.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ top: position.top, left: position.left }}
                >
                  <div className={`w-6 h-6 rounded-full ${getMarkerColor(cattle.status)} border-2 shadow-lg flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Alerts/Notifications</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          {alerts.filter(alert => !alert.resolved).slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center mt-1">
                {alert.type === 'low_battery' ? '🔋' : 
                 alert.type === 'strayed' ? '📍' : 
                 alert.type === 'inactive' ? '⚡' : '❗'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{alert.cattleName}</h4>
                  <Badge className={getAlertColor(alert.severity)}>
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
              </div>
            </div>
          ))}
          
          {activeAlerts === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}