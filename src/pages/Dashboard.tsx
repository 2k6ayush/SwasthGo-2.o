import { useState } from "react";
import { 
  Heart, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Battery
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AlertsList from "@/components/dashboard/AlertsList";
import CattleMap from "@/components/dashboard/CattleMap";
import QuickActions from "@/components/dashboard/QuickActions";
import { mockCattleData, mockAlerts, mockGrazingStats } from "@/data/mockData";
import farmHero from "@/assets/farm-hero.jpg";

export default function Dashboard() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true }
          : alert
      )
    );
  };

  // Calculate stats from mock data
  const stats = {
    currentlyGrazing: mockCattleData.filter(c => c.status === 'grazing').length,
    totalGrazingHours: mockGrazingStats.totalGrazingHours,
    activeAlerts: alerts.filter(a => !a.resolved).length,
    averageBattery: Math.round(
      mockCattleData.reduce((sum, cattle) => sum + cattle.batteryLevel, 0) / mockCattleData.length
    )
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div 
        className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 142, 60, 0.1), rgba(249, 168, 37, 0.1)), url(${farmHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative p-6 bg-gradient-to-r from-background/95 to-background/85">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-foreground mb-2">
                Welcome back! 🌾
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening on <span className="font-semibold text-primary">My Farm</span> today
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleTimeString()}</p>
              <p className="text-xs">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Cattle Grazing Now"
          value={stats.currentlyGrazing}
          icon={Heart}
          status="success"
          subtitle={`of ${mockCattleData.length} total cattle`}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          label="Today's Grazing Hours"
          value={`${stats.totalGrazingHours}h`}
          icon={Clock}
          status="info"
          subtitle="Avg 5.1h per cattle"
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatCard
          label="Active Alerts"
          value={stats.activeAlerts}
          icon={AlertTriangle}
          status={stats.activeAlerts > 2 ? "danger" : stats.activeAlerts > 0 ? "warning" : "success"}
          subtitle={stats.activeAlerts === 0 ? "All clear" : "Needs attention"}
        />
        
        <StatCard
          label="Avg Battery Level"
          value={`${stats.averageBattery}%`}
          icon={Battery}
          status={stats.averageBattery > 70 ? "success" : stats.averageBattery > 40 ? "warning" : "danger"}
          subtitle="Device health status"
          trend={{ value: -3, isPositive: false }}
        />
      </div>

      {/* Main Content - Cattle Map (integrated layout) */}
      <div className="space-y-6">
        <CattleMap cattleData={mockCattleData} />
        
        {/* Alerts Section */}
        <AlertsList 
          alerts={alerts} 
          onResolveAlert={handleResolveAlert}
        />
        
        {/* Quick Actions Section */}
        <QuickActions cattleData={mockCattleData} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="pasture-gradient rounded-lg p-6 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Grazing Analytics</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">
            View detailed grazing patterns and productivity metrics
          </p>
          <button className="text-sm font-medium hover:underline">
            View Analytics →
          </button>
        </div>

        <div className="harvest-gradient rounded-lg p-6 text-secondary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold">Add New Cattle</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">
            Register a new animal and assign tracking device
          </p>
          <button className="text-sm font-medium hover:underline">
            Add Cattle →
          </button>
        </div>

        <div className="field-gradient rounded-lg p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-foreground" />
            <h3 className="font-semibold text-foreground">Device Status</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Monitor and manage all tracking devices
          </p>
          <button className="text-sm font-medium text-primary hover:underline">
            Manage Devices →
          </button>
        </div>
      </div>
    </div>
  );
}