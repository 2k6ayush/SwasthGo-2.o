import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Maximize2, Settings } from "lucide-react";
import { CattleData } from "@/data/mockData";

interface CattleMapProps {
  cattleData: CattleData[];
}

export default function CattleMap({ cattleData }: CattleMapProps) {
  const getMarkerColor = (status: CattleData['status']) => {
    switch (status) {
      case 'grazing':
        return 'bg-green-500';
      case 'resting':
        return 'bg-blue-500';
      case 'moving':
        return 'bg-yellow-500';
      case 'alert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Section - 2 columns */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-success" />
              <CardTitle className="text-lg font-poppins">Live Cattle Locations</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on markers to view detailed information
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="relative w-full h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border-2 border-border">
              {/* Map Background - Simulated street map */}
              <div className="absolute inset-0 opacity-80">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Roads */}
                  <path d="M0 150 L400 150" stroke="#E5E7EB" strokeWidth="4" />
                  <path d="M200 0 L200 300" stroke="#E5E7EB" strokeWidth="4" />
                  <path d="M0 100 L400 100" stroke="#F3F4F6" strokeWidth="2" />
                  <path d="M0 200 L400 200" stroke="#F3F4F6" strokeWidth="2" />
                  <path d="M100 0 L100 300" stroke="#F3F4F6" strokeWidth="2" />
                  <path d="M300 0 L300 300" stroke="#F3F4F6" strokeWidth="2" />
                  
                  {/* Buildings */}
                  <rect x="50" y="50" width="40" height="40" fill="#F9FAFB" stroke="#E5E7EB" />
                  <rect x="320" y="80" width="50" height="30" fill="#F9FAFB" stroke="#E5E7EB" />
                  <rect x="150" y="180" width="35" height="35" fill="#F9FAFB" stroke="#E5E7EB" />
                  <rect x="280" y="220" width="45" height="25" fill="#F9FAFB" stroke="#E5E7EB" />
                  
                  {/* Green areas (pastures) */}
                  <ellipse cx="120" cy="120" rx="30" ry="25" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" strokeDasharray="5,5" />
                  <ellipse cx="300" cy="200" rx="40" ry="30" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="2" strokeDasharray="5,5" />
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
                <div className="w-40 h-40 border-2 border-dashed border-primary/60 rounded-full" />
              </div>

              {/* Cattle Markers */}
              {cattleData.map((cattle, index) => {
                const positions = [
                  { top: '30%', left: '30%' },
                  { top: '60%', left: '45%' },
                  { top: '40%', left: '70%' },
                  { top: '50%', left: '25%' },
                  { top: '65%', left: '60%' }
                ];
                const position = positions[index % positions.length];
                
                return (
                  <div
                    key={cattle.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: position.top, left: position.left }}
                  >
                    <div className={`w-8 h-8 rounded-full ${getMarkerColor(cattle.status)} flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform`}>
                      <span className="text-white text-xs font-bold">🐄</span>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xl min-w-32">
                        <p className="font-semibold text-sm text-gray-900">{cattle.name}</p>
                        <p className="text-xs text-gray-600">{cattle.tagNumber}</p>
                        <p className="text-xs text-gray-600 capitalize">{cattle.status}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Attribution */}
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
                📍 Leaflet | © OpenStreetMap
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cattle Status Panel - 1 column */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <CardTitle className="text-lg font-poppins">Cattle Status</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {cattleData.map((cattle) => (
              <div key={cattle.id} className="p-4 bg-card/50 rounded-lg border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{cattle.name}</h3>
                  <Badge 
                    className={`text-xs ${
                      cattle.status === 'grazing' ? 'bg-green-100 text-green-700' :
                      cattle.status === 'resting' ? 'bg-blue-100 text-blue-700' :
                      cattle.status === 'moving' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}
                  >
                    {cattle.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      🔋 Battery
                    </span>
                    <span className="font-medium">{cattle.batteryLevel}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      🕐 Last Seen
                    </span>
                    <span className="font-medium">{cattle.lastUpdate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      📍 Distance
                    </span>
                    <span className="font-medium">2.3 km</span>
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
  );
}