export const demoData = {
  mentor: {
    firstName: "Jordan",
    initials: "JD",
  },
  athlete: {
    firstName: "Maya",
  },
  overview: {
    weeklyStreak: "4 weeks",
    lessonsCompleted: "8 lessons",
    pulseScore: 76,
    pulseUpdated: "7 days ago",
    totalXp: 425,
  },
  wellbeingHistory: [
    ["Apr 7", 72],
    ["Apr 14", 78],
    ["Apr 21", 65],
    ["Apr 28", 82],
    ["May 5", 76],
    ["This week", 80],
  ] as const,
  recentContext: [
    ["Today", "Weekly check-in due", "bg-[#f4c66a]"],
    ["3 days ago", "High training load", "bg-[#efe7ff]"],
    ["1 week ago", "Away competition", "bg-[#d9ff54]"],
  ] as const,
  learning: {
    unitNumber: 1,
    unitCount: 4,
    stepsComplete: 2,
    stepsTotal: 7,
    progressPercent: 29,
    weeklyGoalComplete: 2,
    weeklyGoalTotal: 3,
    weeklyGoalDays: [true, true, false],
    exampleGameXp: 100,
  },
  courseProgress: {
    parent: [72, 20, 0],
    coach: [72, 20, 0],
  },
} as const;
