import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bluetooth, Plus, Battery, Wifi, Settings, Smartphone } from "lucide-react";
import { mockCattleData } from "@/data/mockData";

export default function ManageDevices() {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-success';
    if (level > 40) return 'text-warning';
    return 'text-destructive';
  };

  const getSignalStrength = (level: number) => {
    if (level > 80) return '████';
    if (level > 60) return '███▒';
    if (level > 40) return '██▒▒';
    return '█▒▒▒';
  };

  return (
    <div className="min-h-screen bg-background pb-20 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Manage Devices</h1>
        <p className="text-muted-foreground">Device pairing and notification settings</p>
      </div>

      {/* Device Pairing Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Device Pairing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full h-12 bg-primary hover:bg-primary/90">
            <Bluetooth className="w-5 h-5 mr-2" />
            Pair New Device
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Make sure the device is in pairing mode and nearby
          </p>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices ({mockCattleData.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCattleData.map((cattle) => (
            <div key={cattle.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
              {/* Device Icon */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              
              {/* Device Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{cattle.name}</h3>
                  <span className="text-sm text-muted-foreground">{cattle.tagNumber}</span>
                </div>
                <p className="text-sm text-muted-foreground">GPS Collar Device</p>
                <p className="text-xs text-muted-foreground">Last sync: {cattle.lastUpdate}</p>
              </div>
              
              {/* Device Status */}
              <div className="text-right space-y-1">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  <span className={`font-medium ${getBatteryColor(cattle.batteryLevel)}`}>
                    {cattle.batteryLevel}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  <span className="font-mono text-xs">
                    {getSignalStrength(cattle.batteryLevel)}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Device Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-success">
            {mockCattleData.filter(c => c.batteryLevel > 70).length}
          </div>
          <div className="text-sm text-muted-foreground">Good Battery</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-warning">
            {mockCattleData.filter(c => c.batteryLevel <= 70 && c.batteryLevel > 40).length}
          </div>
          <div className="text-sm text-muted-foreground">Low Battery</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-destructive">
            {mockCattleData.filter(c => c.batteryLevel <= 40).length}
          </div>
          <div className="text-sm text-muted-foreground">Critical</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border text-center">
          <div className="text-2xl font-bold text-primary">{mockCattleData.length}</div>
          <div className="text-sm text-muted-foreground">Total Active</div>
        </div>
      </div>
    </div>
  );
}