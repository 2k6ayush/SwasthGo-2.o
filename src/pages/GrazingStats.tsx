import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Activity, TrendingUp } from "lucide-react";
import { mockCattleData, mockGrazingStats } from "@/data/mockData";

export default function GrazingStats() {
  const [activeTab, setActiveTab] = useState("weekly");

  const tabs = [
    { id: "weekly", label: "Weekly" },
    { id: "daily", label: "Daily" },
    { id: "individual", label: "Individual" }
  ];

  const weeklyData = [
    { date: "Jan 15", hours: 32.5 },
    { date: "Jan 14", hours: 28.2 },
    { date: "Jan 13", hours: 35.1 },
    { date: "Jan 12", hours: 30.4 },
    { date: "Jan 11", hours: 27.8 }
  ];

  const activityTimeline = [
    { time: "06:00", event: "Started grazing", detail: "3 cattle active" },
    { time: "08:30", event: "Peak activity", detail: "5 cattle active" },
    { time: "12:00", event: "Rest period", detail: "2 cattle resting" },
    { time: "14:30", event: "Resumed grazing", detail: "4 cattle active" }
  ];

  const individualData = mockCattleData.map(cattle => ({
    name: cattle.name,
    id: cattle.tagNumber,
    hours: cattle.grazingHours,
    activity: Math.round(cattle.healthScore * 0.75) // Convert health score to activity percentage
  }));

  return (
    <div className="min-h-screen bg-background pb-20 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Grazing Stats</h1>
        <p className="text-muted-foreground">Analyze cattle grazing patterns and activity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">6.3h</div>
                <div className="text-sm text-muted-foreground">Avg Daily Grazing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Activity className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="text-2xl font-bold text-info">71%</div>
                <div className="text-sm text-muted-foreground">Avg Activity Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">+12%</div>
                <div className="text-sm text-muted-foreground">Weekly Trend</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`flex-1 ${
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "weekly" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Weekly Grazing Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{day.date}</span>
                <div className="flex items-center gap-4 flex-1 mx-4">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(day.hours / 40) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium text-sm w-12 text-right">{day.hours}h</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "daily" && (
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activityTimeline.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  {index < activityTimeline.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                  <h4 className="font-semibold">{activity.event}</h4>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "individual" && (
        <Card>
          <CardHeader>
            <CardTitle>Individual Cattle Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {individualData.map((cattle, index) => (
              <div key={cattle.name} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {cattle.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{cattle.name}</h4>
                  <p className="text-sm text-muted-foreground">{cattle.id}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{cattle.hours}h</div>
                  <div className="text-sm text-muted-foreground">{cattle.activity}% active</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}