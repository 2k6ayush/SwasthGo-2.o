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
    name: 'Bella',
    tagNumber: 'CT001',
    coordinates: [77.5946, 12.9716], // Bangalore area
    status: 'grazing',
    batteryLevel: 85,
    lastUpdate: '2 minutes ago',
    grazingHours: 6.5,
    healthScore: 92
  },
  {
    id: '2',
    name: 'Moobert',
    tagNumber: 'CT002',
    coordinates: [77.5976, 12.9746],
    status: 'resting',
    batteryLevel: 72,
    lastUpdate: '5 minutes ago',
    grazingHours: 4.2,
    healthScore: 88
  },
  {
    id: '3',
    name: 'Daisy',
    tagNumber: 'CT003',
    coordinates: [77.5916, 12.9686],
    status: 'moving',
    batteryLevel: 45,
    lastUpdate: '1 minute ago',
    grazingHours: 7.1,
    healthScore: 95
  },
  {
    id: '4',
    name: 'Thunder',
    tagNumber: 'CT004',
    coordinates: [77.5986, 12.9756],
    status: 'grazing',
    batteryLevel: 91,
    lastUpdate: '3 minutes ago',
    grazingHours: 5.8,
    healthScore: 90
  },
  {
    id: '5',
    name: 'Rosie',
    tagNumber: 'CT005',
    coordinates: [77.5896, 12.9666],
    status: 'alert',
    batteryLevel: 18,
    lastUpdate: '8 minutes ago',
    grazingHours: 2.1,
    healthScore: 78
  }
];

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    cattleId: '5',
    cattleName: 'Rosie',
    type: 'low_battery',
    severity: 'high',
    message: 'Battery level critically low (18%)',
    timestamp: '10 minutes ago',
    resolved: false
  },
  {
    id: '2',
    cattleId: '3',
    cattleName: 'Daisy',
    type: 'strayed',
    severity: 'medium',
    message: 'Moved beyond designated grazing area',
    timestamp: '25 minutes ago',
    resolved: false
  },
  {
    id: '3',
    cattleId: '2',
    cattleName: 'Moobert',
    type: 'inactive',
    severity: 'low',
    message: 'No significant movement for 3 hours',
    timestamp: '1 hour ago',
    resolved: true
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