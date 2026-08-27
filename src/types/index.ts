export type UsageCategory = 'Social' | 'Entertainment' | 'Study' | 'Communication' | 'Other';

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  email?: string;
  daily_screen_time_goal: number; // in minutes
  notification_preference: 'all' | 'important' | 'none';
  created_at: string;
  updated_at: string;
}

export interface UsageEntry {
  id: string;
  user_id: string;
  app_name: string;
  minutes_used: number;
  category: UsageCategory;
  pickups: number;
  date: string; // YYYY-MM-DD
  created_at: string;
}

export interface FocusSession {
  id: string;
  user_id: string;
  duration_minutes: number;
  started_at: string;
  completed_at: string | null;
  is_completed: boolean;
  points_awarded: number;
  created_at: string;
}

export interface ExamSession {
  id: string;
  user_id: string;
  duration_minutes: number;
  started_at: string;
  completed_at: string | null;
  is_completed: boolean;
  points_awarded: number;
  created_at: string;
}

export interface BuddyConnection {
  id: string;
  user_id: string;
  buddy_id: string;
  buddy_code: string;
  status: 'pending' | 'connected';
  connected_at: string | null;
  created_at: string;
}

export interface Reward {
  id: string;
  user_id: string;
  points: number;
  reason: string; // e.g., "25-minute focus session", "Daily goal achieved"
  transaction_type: 'earn' | 'spend';
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  badge_id: string;
  badge_name: string;
  description: string;
  icon: string;
  unlocked_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface Activity {
  id: string;
  category: 'Exercise' | 'Reading' | 'Walking' | 'Prayer / Reflection' | 'Studying' | 'Hobby' | 'Family Time' | 'Creative Activities';
  title: string;
  description: string;
  duration_minutes: number;
  points_reward: number;
}

export interface ActivityCompletion {
  id: string;
  user_id: string;
  activity_id: string;
  completed_at: string;
  points_earned: number;
}

export interface DemoData {
  screenTime: number; // minutes
  focusTime: number; // minutes
  pickups: number;
  streak: number; // days
  points: number;
}
