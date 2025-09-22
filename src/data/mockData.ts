export interface CattleData {
  id: string;
  name: string;
  tagNumber: string;
  coordinates: [number, number];
  status: 'grazing' | 'resting' | 'moving' | 'alert';
  batteryLevel: number;
  lastUpdate: string;
  grazingHours: number;
  healthScore: number;
}

export interface Alert {
  id: string;
  cattleId: string;
  cattleName: string;
  type: 'strayed' | 'inactive' | 'low_battery' | 'health';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface GrazingStats {
  totalCattle: number;
  currentlyGrazing: number;
  averageGrazingHours: number;
  totalGrazingHours: number;
  weeklyData: Array<{
    day: string;
    hours: number;
  }>;
}

// Mock cattle data
export const mockCattleData: CattleData[] = [
  {
    id: '1',
    name: 'Ganga',
    tagNumber: 'COW001',
    coordinates: [77.5946, 12.9716],
    status: 'grazing',
    batteryLevel: 85,
    lastUpdate: '2 mins ago',
    grazingHours: 6.5,
    healthScore: 92
  },
  {
    id: '2',
    name: 'Lakshmi',
    tagNumber: 'COW002',
    coordinates: [77.5976, 12.9746],
    status: 'resting',
    batteryLevel: 92,
    lastUpdate: '1 min ago',
    grazingHours: 5.2,
    healthScore: 88
  },
  {
    id: '3',
    name: 'Kamdhenu',
    tagNumber: 'COW003',
    coordinates: [77.5916, 12.9686],
    status: 'moving',
    batteryLevel: 45,
    lastUpdate: '15 mins ago',
    grazingHours: 4.8,
    healthScore: 95
  },
  {
    id: '4',
    name: 'Radha',
    tagNumber: 'COW004',
    coordinates: [77.5986, 12.9756],
    status: 'grazing',
    batteryLevel: 78,
    lastUpdate: '3 mins ago',
    grazingHours: 5.9,
    healthScore: 90
  },
  {
    id: '5',
    name: 'Saraswati',
    tagNumber: 'COW005',
    coordinates: [77.5896, 12.9666],
    status: 'alert',
    batteryLevel: 18,
    lastUpdate: '10 mins ago',
    grazingHours: 2.1,
    healthScore: 78
  }
];

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    cattleId: '3',
    cattleName: 'Kamdhenu',
    type: 'low_battery',
    severity: 'high',
    message: 'Device battery below 25%',
    timestamp: '10 mins ago',
    resolved: false
  },
  {
    id: '2',
    cattleId: '3',
    cattleName: 'Kamdhenu',
    type: 'inactive',
    severity: 'high',
    message: 'Low activity detected for 2+ hours',
    timestamp: '15 mins ago',
    resolved: false
  },
  {
    id: '3',
    cattleId: '1',
    cattleName: 'Ganga',
    type: 'strayed',
    severity: 'medium',
    message: 'Animal moved outside designated area',
    timestamp: '1 hour ago',
    resolved: false
  }
];

// Mock grazing statistics
export const mockGrazingStats: GrazingStats = {
  totalCattle: 5,
  currentlyGrazing: 2,
  averageGrazingHours: 5.1,
  totalGrazingHours: 25.7,
  weeklyData: [
    { day: 'Mon', hours: 6.2 },
    { day: 'Tue', hours: 5.8 },
    { day: 'Wed', hours: 7.1 },
    { day: 'Thu', hours: 4.9 },
    { day: 'Fri', hours: 5.4 },
    { day: 'Sat', hours: 6.7 },
    { day: 'Sun', hours: 5.2 }
  ]
};