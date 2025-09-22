import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'danger' | 'info';
  subtitle?: string;
}

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  status = 'info',
  subtitle 
}: StatCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'danger':
        return 'border-destructive/20 bg-destructive/5';
      default:
        return 'border-primary/20 bg-primary/5';
    }
  };

  const getIconStyles = () => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'danger':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <Card className={`smooth-transition hover:farm-shadow ${getStatusStyles()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">
                {value}
              </p>
              {trend && (
                <Badge 
                  variant={trend.isPositive ? "default" : "destructive"}
                  className="text-xs"
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </Badge>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className={`p-3 rounded-lg ${getIconStyles()}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}