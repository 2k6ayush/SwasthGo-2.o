import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Navigation, Radio, Battery, Clock, Zap, Settings } from "lucide-react";
import { mockCattleData } from "@/data/mockData";

export default function CattleMap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'grazing':
        return 'bg-success text-white';
      case 'resting':
        return 'bg-info text-white';
      case 'moving':
        return 'bg-warning text-white';
      case 'alert':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-foreground';
    }
  };

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

  // Count animals by status
  const statusCounts = mockCattleData.reduce((acc, cattle) => {
    acc[cattle.status] = (acc[cattle.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background pb-20 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Cattle Map</h1>
        <p className="text-muted-foreground">Real-time cattle location tracking</p>
        <p className="text-sm text-muted-foreground mt-1">
          Showing {mockCattleData.length} of {mockCattleData.length} animals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Live Cattle Locations</CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">Geofence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Click on markers to view detailed information
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border-2 border-border">
                {/* Map Background - Simulated street map */}
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
                    
                    <rect x="20" y="240" width="100" height="40" fill="#F3F4F6" stroke="#D1D5DB" />
                    <text x="70" y="265" textAnchor="middle" fontSize="8" fill="#6B7280">Kartavya Path</text>
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
                    { top: '45%', left: '35%' },  // Ganga - grazing
                    { top: '55%', left: '50%' },  // Lakshmi - resting  
                    { top: '40%', left: '65%' },  // Moving
                    { top: '60%', left: '40%' },  // Alert
                    { top: '50%', left: '30%' }   // Another
                  ];
                  const position = positions[index % positions.length];
                  
                  return (
                    <div
                      key={cattle.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ top: position.top, left: position.left }}
                    >
                      <div className={`w-6 h-6 rounded-full ${getMarkerColor(cattle.status)} border-2 shadow-lg hover:scale-110 transition-transform flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                  );
                })}

                {/* Map Attribution */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/90 px-2 py-1 rounded">
                  🗺️ Leaflet | © OpenStreetMap
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cattle Status Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <CardTitle className="text-lg">Cattle Status</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {mockCattleData.length} of {mockCattleData.length} animals
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {mockCattleData.slice(0, 2).map((cattle) => (
                <div key={cattle.id} className="p-4 bg-muted/30 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{cattle.name}</h3>
                    <Badge className={getStatusColor(cattle.status)}>
                      {cattle.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Battery className="w-4 h-4" />
                        Battery
                      </span>
                      <span className="font-medium text-success">{cattle.batteryLevel}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Last Seen
                      </span>
                      <span className="font-medium">{cattle.lastUpdate}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Distance
                      </span>
                      <span className="font-medium">
                        {cattle.name === 'Ganga' ? '0.6 km' : cattle.name === 'Lakshmi' ? '2.4 km' : '1.2 km'}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-success">{statusCounts.grazing || 0}</div>
          <div className="text-sm text-muted-foreground">Grazing</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-info">{statusCounts.resting || 0}</div>
          <div className="text-sm text-muted-foreground">Resting</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-warning">{statusCounts.moving || 0}</div>
          <div className="text-sm text-muted-foreground">Moving</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-destructive">{statusCounts.alert || 0}</div>
          <div className="text-sm text-muted-foreground">Alerts</div>
        </div>
      </div>
    </div>
  );
}