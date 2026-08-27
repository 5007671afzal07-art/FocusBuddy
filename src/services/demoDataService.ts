import { UsageEntry, FocusSession, ExamSession } from '@/types';
import { getDateKey } from '@/utils/calculations';

/**
 * Demo data service for development and testing.
 * Provides realistic mock data for screen time, focus sessions, and streaks.
 */

const DEMO_USER_ID = 'demo-user-001';

export const generateDemoUsageEntries = (): UsageEntry[] => {
  const entries: UsageEntry[] = [];
  const today = new Date();
  const apps = [
    { name: 'Instagram', category: 'Social' as const, baseMinutes: 45 },
    { name: 'TikTok', category: 'Entertainment' as const, baseMinutes: 60 },
    { name: 'Discord', category: 'Communication' as const, baseMinutes: 30 },
    { name: 'YouTube', category: 'Entertainment' as const, baseMinutes: 50 },
    { name: 'Notion', category: 'Study' as const, baseMinutes: 35 },
    { name: 'WhatsApp', category: 'Communication' as const, baseMinutes: 20 },
  ];

  // Generate 7 days of data
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = getDateKey(date);

    apps.forEach((app) => {
      const variance = (Math.random() - 0.5) * 20;
      entries.push({
        id: `usage-${i}-${app.name}`,
        user_id: DEMO_USER_ID,
        app_name: app.name,
        minutes_used: Math.max(5, Math.round(app.baseMinutes + variance)),
        category: app.category,
        pickups: Math.floor(Math.random() * 10) + 3,
        date: dateStr,
        created_at: new Date(dateStr).toISOString(),
      });
    });
  }

  return entries;
};

export const generateDemoFocusSessions = (): FocusSession[] => {
  const sessions: FocusSession[] = [];
  const today = new Date();
  const durations = [25, 45, 60];

  // Generate sessions for the past 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = getDateKey(date);

    // 1-3 sessions per day
    const sessionsPerDay = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < sessionsPerDay; j++) {
      const duration = durations[Math.floor(Math.random() * durations.length)];
      let points = 0;
      if (duration >= 60) points = 50;
      else if (duration >= 45) points = 35;
      else if (duration >= 25) points = 20;

      const startTime = new Date(dateStr);
      startTime.setHours(Math.floor(Math.random() * 12) + 8); // 8 AM - 8 PM
      startTime.setMinutes(Math.floor(Math.random() * 60));

      const completedTime = new Date(startTime);
      completedTime.setMinutes(completedTime.getMinutes() + duration);

      sessions.push({
        id: `focus-${i}-${j}`,
        user_id: DEMO_USER_ID,
        duration_minutes: duration,
        started_at: startTime.toISOString(),
        completed_at: completedTime.toISOString(),
        is_completed: true,
        points_awarded: points,
        created_at: startTime.toISOString(),
      });
    }
  }

  return sessions;
};

export const generateDemoExamSessions = (): ExamSession[] => {
  const sessions: ExamSession[] = [];
  const today = new Date();

  // 2-3 exam sessions in the past 7 days
  const numSessions = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < numSessions; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    const dateStr = getDateKey(date);

    const durations = [30, 60, 90, 120];
    const duration = durations[Math.floor(Math.random() * durations.length)];

    const startTime = new Date(dateStr);
    startTime.setHours(Math.floor(Math.random() * 8) + 9); // 9 AM - 5 PM
    startTime.setMinutes(0);

    const completedTime = new Date(startTime);
    completedTime.setMinutes(completedTime.getMinutes() + duration);

    sessions.push({
      id: `exam-${i}`,
      user_id: DEMO_USER_ID,
      duration_minutes: duration,
      started_at: startTime.toISOString(),
      completed_at: completedTime.toISOString(),
      is_completed: true,
      points_awarded: 50,
      created_at: startTime.toISOString(),
    });
  }

  return sessions;
};
