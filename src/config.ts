export const productConfig = {
  name: "TEAM Institute",
  tagline: "Training and Education for Athlete Mentors",
  website: "teaminstitute.org",
  browserTitle: "TEAM Institute | Performance Training for Coaches, Parents, and Youth Athletes",
  prices: {
    education: "$199 per team, per season",
    educationAmount: 199,
    complete: "$30 per athlete, per season, capped at $60 per athlete per year",
    liveSessions: {
      display: "By quote",
      description: "priced per session, by quote",
    },
  },
  publicNavigation: [
    { label: "Our approach", href: "/#method" },
    { label: "For organizations", href: "/organizations" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
  ],
} as const;
