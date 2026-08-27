import { UsageEntry, FocusSession, Achievement } from '@/types';
import { getDateKey } from './calculations';

export class InsightEngine {
  /**
   * Generates AI-style insights based on usage data.
   * This is rule-based for MVP; can be replaced with real AI API later.
   */
  static generateInsights(
    usageEntries: UsageEntry[],
    focusSessions: FocusSession[],
  ): string[] {
    const insights: string[] = [];
    const today = getDateKey();

    // Calculate daily metrics
    const todayEntries = usageEntries.filter((entry) => entry.date === today);
    const totalScreenTime = todayEntries.reduce((sum, entry) => sum + entry.minutes_used, 0);
    const totalPickups = todayEntries.reduce((sum, entry) => sum + entry.pickups, 0);

    // Determine most-used category
    const categoryUsage: Record<string, number> = {};
    todayEntries.forEach((entry) => {
      categoryUsage[entry.category] = (categoryUsage[entry.category] || 0) + entry.minutes_used;
    });

    const mostUsedCategory = Object.entries(categoryUsage).sort(([, a], [, b]) => b - a)[0];

    // Generate insights
    if (mostUsedCategory) {
      insights.push(`📱 You spent the most time on ${mostUsedCategory[0]} apps today.`);
    }

    if (totalPickups > 30) {
      insights.push('📲 You had quite a few phone pickups today. Consider using a focus session to minimize distractions.');
    }

    if (totalScreenTime > 120) {
      insights.push('⏰ Your screen time is trending higher today. A distraction-free session might help you reset.');
    }

    const todayFocusSessions = focusSessions.filter(
      (session) => session.created_at.split('T')[0] === today && session.is_completed
    );
    const totalFocusTime = todayFocusSessions.reduce((sum, session) => sum + session.duration_minutes, 0);

    if (totalFocusTime > 60) {
      insights.push('🌟 You\'ve had great focus time today! Keep up the momentum.');
    } else if (totalFocusTime === 0) {
      insights.push('💡 Starting a focus session now could make a big difference in your productivity today.');
    }

    // Evening usage pattern
    const now = new Date();
    if (now.getHours() >= 19 && totalScreenTime > 90) {
      insights.push('🌙 Your evening screen time is high. Consider a wind-down activity instead.');
    }

    // Short sessions pattern
    const shortSessions = usageEntries.filter(
      (entry) => entry.date === today && entry.minutes_used < 5
    ).length;
    if (shortSessions > 5) {
      insights.push('⚡ You had many short phone sessions today. Try batching your app usage.');
    }

    return insights.length > 0 ? insights : ['Keep focusing on your goals. You\'re doing great!'];
  }

  static getAchievementRecommendation(achievements: Achievement[]): string {
    if (achievements.length === 0) {
      return '🎯 Unlock your first badge by completing a 25-minute focus session!';
    }
    return `⭐ You have ${achievements.length} badge${achievements.length !== 1 ? 's' : ''}! Keep pushing for more.`;
  }

  static getWeeklyComparison(currentWeek: number, previousWeek: number): string {
    const change = currentWeek - previousWeek;
    if (change < 0) {
      return `📉 Great job! Your screen time decreased by ${Math.abs(change)} minutes compared to last week.`;
    } else if (change > 0) {
      return `📈 Your screen time increased by ${change} minutes this week. Try to bring it down.`;
    }
    return '📊 Your screen time is consistent with last week.';
  }
}
