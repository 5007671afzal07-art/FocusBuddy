import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Clock, Target } from 'lucide-react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateDemoUsageEntries, generateDemoFocusSessions } from '@/services/demoDataService';

const StatisticsPage: React.FC = () => {
  const [usageEntries] = useState(() => generateDemoUsageEntries());
  const [focusSessions] = useState(() => generateDemoFocusSessions());
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Calculate statistics
  const totalSessions = focusSessions.filter((s) => s.is_completed).length;
  const totalFocusMinutes = focusSessions
    .filter((s) => s.is_completed)
    .reduce((sum, s) => sum + s.duration_minutes, 0);
  const totalScreenTime = usageEntries.reduce((sum, e) => sum + e.minutes_used, 0);
  const averageFocusSession = totalSessions > 0 ? Math.round(totalFocusMinutes / totalSessions) : 0;
  const focusToScreenRatio = totalScreenTime > 0 ? ((totalFocusMinutes / totalScreenTime) * 100).toFixed(1) : 0;

  // Weekly data
  const weeklyData = [
    { day: 'Mon', focus: 120, screen: 480 },
    { day: 'Tue', focus: 150, screen: 520 },
    { day: 'Wed', focus: 180, screen: 450 },
    { day: 'Thu', focus: 140, screen: 510 },
    { day: 'Fri', focus: 160, screen: 490 },
    { day: 'Sat', focus: 100, screen: 380 },
    { day: 'Sun', focus: 130, screen: 400 },
  ];

  const focusTrendData = [
    { week: 'W1', sessions: 8, minutes: 450 },
    { week: 'W2', sessions: 10, minutes: 520 },
    { week: 'W3', sessions: 9, minutes: 480 },
    { week: 'W4', sessions: 12, minutes: 620 },
  ];

  const topProductiveHours = [
    { hour: '6-7 AM', count: 12, percentage: 95 },
    { hour: '8-9 AM', count: 10, percentage: 85 },
    { hour: '9-10 AM', count: 14, percentage: 100 },
    { hour: '2-3 PM', count: 8, percentage: 70 },
  ];

  return (
    <div className="pb-24 pt-4 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 size={32} />
          Statistics
        </h1>
        <p className="text-gray-600 mt-1">Track your productivity metrics</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {(['week', 'month', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === range
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
          <h2 className="text-2xl font-bold text-primary-600 mb-1">{totalSessions}</h2>
          <p className="text-xs text-gray-500">+2 from last week</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Focus Minutes</p>
          <h2 className="text-2xl font-bold text-primary-600 mb-1">{totalFocusMinutes}</h2>
          <p className="text-xs text-gray-500">+50 min from last week</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg Session</p>
          <h2 className="text-2xl font-bold text-primary-600 mb-1">{averageFocusSession}m</h2>
          <p className="text-xs text-gray-500">Per focus session</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Focus Ratio</p>
          <h2 className="text-2xl font-bold text-primary-600 mb-1">{focusToScreenRatio}%</h2>
          <p className="text-xs text-gray-500">Focus vs screen time</p>
        </Card>
      </div>

      {/* Daily Focus vs Screen Time */}
      <Card className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="focus" fill="#2563eb" name="Focus (min)" />
            <Bar dataKey="screen" fill="#10b981" name="Screen (min)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Focus Sessions Trend */}
      <Card className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={focusTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="sessions" stroke="#2563eb" name="Sessions" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Most Productive Hours */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={18} />
          Most Productive Hours
        </h3>
        <div className="space-y-3">
          {topProductiveHours.map((hour) => (
            <div key={hour.hour}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{hour.hour}</span>
                <Badge variant="primary" size="sm">
                  {hour.percentage}% productive
                </Badge>
              </div>
              <ProgressBar percentage={hour.percentage} showLabel={false} size="sm" />
              <p className="text-xs text-gray-500 mt-1">{hour.count} sessions</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPage;
