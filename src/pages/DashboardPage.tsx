import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingDown, Zap, Target } from 'lucide-react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ProgressRing from '@/components/ProgressRing';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { generateDemoUsageEntries, generateDemoFocusSessions } from '@/services/demoDataService';
import { formatTime, calculateStreak } from '@/utils/calculations';
import { InsightEngine } from '@/services/insightEngine';
import { getDateKey } from '@/utils/calculations';

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [usageEntries] = useState(() => generateDemoUsageEntries());
  const [focusSessions] = useState(() => generateDemoFocusSessions());
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    setInsights(InsightEngine.generateInsights(usageEntries, focusSessions));
  }, [usageEntries, focusSessions]);

  const today = getDateKey();
  const todayUsage = usageEntries.filter((e) => e.date === today);
  const todayFocus = focusSessions.filter((s) => s.created_at.split('T')[0] === today && s.is_completed);

  const totalScreenTime = todayUsage.reduce((sum, e) => sum + e.minutes_used, 0);
  const totalFocusTime = todayFocus.reduce((sum, s) => sum + s.duration_minutes, 0);
  const screenTimePercent = Math.min(100, (totalScreenTime / (profile?.daily_screen_time_goal || 180)) * 100);

  // Calculate streak
  const completedDates = focusSessions
    .filter((s) => s.is_completed)
    .map((s) => s.created_at.split('T')[0])
    .filter((date, index, self) => self.indexOf(date) === index);
  const streak = calculateStreak(completedDates);

  // Get top apps
  const topApps = todayUsage
    .sort((a, b) => b.minutes_used - a.minutes_used)
    .slice(0, 3);

  return (
    <div className="pb-24 pt-4 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hey, {profile?.username}! 👋</h1>
        <p className="text-gray-600 mt-1">Stay focused, build habits</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="text-center">
          <div className="text-2xl font-bold text-primary-600">{totalScreenTime}m</div>
          <p className="text-xs text-gray-600 mt-1">Screen Time</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-primary-600">{totalFocusTime}m</div>
          <p className="text-xs text-gray-600 mt-1">Focus Time</p>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-primary-600">{streak}🔥</div>
          <p className="text-xs text-gray-600 mt-1">Streak</p>
        </Card>
      </div>

      {/* Screen Time Ring */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Daily Goal</h2>
          <Badge variant="primary">
            {Math.round(screenTimePercent)}% used
          </Badge>
        </div>
        <div className="flex justify-center py-4">
          <ProgressRing percentage={screenTimePercent} size="md" />
        </div>
        <p className="text-center text-sm text-gray-600">
          {totalScreenTime}m of {profile?.daily_screen_time_goal || 180}m
        </p>
      </Card>

      {/* Focus Session CTA */}
      <Card className="mb-6 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Start a Focus Session</h3>
            <p className="text-sm text-gray-600">Minimize distractions and boost productivity</p>
          </div>
          <Button variant="primary" size="sm">
            <Zap size={16} />
            Start
          </Button>
        </div>
      </Card>

      {/* Insights */}
      {insights.length > 0 && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BarChart3 size={18} />
            Today's Insights
          </h3>
          <div className="space-y-2">
            {insights.slice(0, 3).map((insight, index) => (
              <p key={index} className="text-sm text-gray-700 leading-relaxed">
                {insight}
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Top Apps */}
      {topApps.length > 0 && (
        <Card className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Apps Today</h3>
          <div className="space-y-3">
            {topApps.map((app) => (
              <div key={app.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{app.app_name}</span>
                  <span className="text-xs font-semibold text-primary-600">{app.minutes_used}m</span>
                </div>
                <ProgressBar
                  percentage={(app.minutes_used / (totalScreenTime || 1)) * 100}
                  showLabel={false}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Goals Section */}
      <Card>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target size={18} />
          Weekly Goals
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Focus Sessions</span>
              <span className="text-xs text-gray-600">4 of 7</span>
            </div>
            <ProgressBar percentage={57} showLabel={false} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Reduce Screen Time</span>
              <span className="text-xs text-gray-600">In Progress</span>
            </div>
            <ProgressBar percentage={72} showLabel={false} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
