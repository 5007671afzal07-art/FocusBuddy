export const calculatePoints = (
  focusDuration: number,
): number => {
  if (focusDuration >= 60) return 50;
  if (focusDuration >= 45) return 35;
  if (focusDuration >= 25) return 20;
  return 0;
};

export const calculateExamPoints = (): number => 50;

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const formatTimeDetailed = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} minutes`;
  if (mins === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${mins} minutes`;
};

export const getStreakEmoji = (streak: number): string => {
  if (streak === 0) return '🌧️';
  if (streak < 3) return '⭐';
  if (streak < 7) return '🔥';
  return '🚀';
};

export const getMotivationalMessage = (): string => {
  const messages = [
    'Small progress is still progress.',
    'Every minute counts.',
    'You\'re doing great!',
    'Stay focused, stay strong.',
    'Your future self will thank you.',
    'Keep going, you\'ve got this!',
    'Progress over perfection.',
    'One focus session at a time.',
    'You\'re building great habits.',
    'Every focus session matters.',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const generateBuddyCode = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getDateKey = (date: Date = new Date()): string => {
  return date.toISOString().split('T')[0];
};

export const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;

  const sortedDates = completedDates.sort().reverse();
  let streak = 0;
  let currentDate = new Date();
  const dateKey = getDateKey(currentDate);

  // Check if today has activity
  if (!sortedDates.includes(dateKey)) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDateKey = getDateKey(currentDate);
    if (sortedDates[i] === expectedDateKey) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};
