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

  const getAlertBackground = (type: Alert['type'], severity: Alert['severity']) => {
    if (type === 'strayed') {
      return 'bg-red-50 border-red-200';
    }
    if (type === 'low_battery') {
      return 'bg-yellow-50 border-yellow-200';
    }
    if (type === 'inactive') {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  const getAlertTextColor = (type: Alert['type']) => {
    if (type === 'strayed') return 'text-red-700';
    if (type === 'low_battery') return 'text-yellow-700';
    if (type === 'inactive') return 'text-blue-700';
    return 'text-gray-700';
  };

  const getAlertBadge = (type: Alert['type']) => {
    if (type === 'strayed') return 'Animal Strayed';
    if (type === 'low_battery') return 'Low Battery';
    if (type === 'inactive') return 'Inactive Animal';
    return 'Alert';
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle className="text-lg font-poppins">Recent Alerts/Notifications</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertBackground(alert.type, alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${getAlertTextColor(alert.type)}`}>
                        {alert.cattleName} has {alert.type === 'strayed' ? 'moved outside safe zone' : 
                         alert.type === 'low_battery' ? `device battery is low (${alert.message.match(/\d+/)?.[0]}%)` :
                         'inactive for 2 hours'}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {alert.timestamp}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      className={`text-xs ${
                        alert.type === 'strayed' ? 'bg-red-100 text-red-700' :
                        alert.type === 'low_battery' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {getAlertBadge(alert.type)}
                    </Badge>
                    
                    {onResolveAlert && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onResolveAlert(alert.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}