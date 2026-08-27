export function generateDemoUsageEntries() {
  return [
    { id: '1', date: new Date(), minutes_used: 480 },
    { id: '2', date: new Date(), minutes_used: 520 },
    { id: '3', date: new Date(), minutes_used: 450 },
  ];
}

export function generateDemoFocusSessions() {
  return [
    { id: '1', duration_minutes: 25, is_completed: true, created_at: new Date() },
    { id: '2', duration_minutes: 25, is_completed: true, created_at: new Date() },
    { id: '3', duration_minutes: 25, is_completed: true, created_at: new Date() },
    { id: '4', duration_minutes: 25, is_completed: false, created_at: new Date() },
  ];
}
