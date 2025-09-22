import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Battery, MapPin, Activity, X } from "lucide-react";
import { Alert } from "@/data/mockData";

interface AlertsListProps {
  alerts: Alert[];
  onResolveAlert?: (alertId: string) => void;
}

export default function AlertsList({ alerts, onResolveAlert }: AlertsListProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'low_battery':
        return Battery;
      case 'strayed':
        return MapPin;
      case 'inactive':
        return Activity;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-poppins">
            Recent Alerts
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {activeAlerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          <>
            {/* Active Alerts */}
            <div className="space-y-3">
              {activeAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div 
                    key={alert.id}
                    className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border"
                  >
                    <div className={`p-2 rounded-full ${
                      alert.severity === 'high' 
                        ? 'bg-destructive/10 text-destructive' 
                        : alert.severity === 'medium'
                        ? 'bg-secondary/10 text-secondary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm text-foreground">
                          {alert.cattleName}
                        </p>
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.timestamp}
                      </p>
                    </div>
                    
                    {onResolveAlert && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onResolveAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Show resolved alerts if any */}
            {resolvedAlerts.length > 0 && (
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground mb-2">Recently Resolved</p>
                {resolvedAlerts.slice(0, 2).map((alert) => {
                  const Icon = getAlertIcon(alert.type);
                  return (
                    <div 
                      key={alert.id}
                      className="flex items-start gap-3 p-2 opacity-60"
                    >
                      <div className="p-1 rounded-full bg-muted text-muted-foreground">
                        <Icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {alert.cattleName}: {alert.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}