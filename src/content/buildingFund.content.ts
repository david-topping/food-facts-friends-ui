export const BUILDING_FUND_CONTENT = {
  banner: {
    message: "We're raising funds to buy our building at 42 John Street.",
    linkLabel: "Find out more",
    route: "/building-fund",
  },

  hero: {
    title: "Help Us Buy Our Building",
    subtitle: "We're raising funds to buy 42 John Street and secure our home for good.",
  },

  reasons: {
    title: "Why we need to buy this building",
    items: [
      {
        icon: "home",
        title: "More than a building",
        description:
          "42 John Street is the heart of our community. It's our pantry, our meeting place, and our advice centre, where people find food, support, and connection.",
      },
      {
        icon: "lock",
        title: "Permanence & security",
        description:
          "No more worrying about rent rises or having to move. This hub stays exactly where it is, for good.",
      },
      {
        icon: "savings",
        title: "Better use of funds",
        description:
          "Every pound spent on rent is a pound we can't spend on food and support. Owning the building frees up resources for the people we help.",
      },
      {
        icon: "trending_up",
        title: "Room to grow",
        description:
          "We can improve and expand our services and plan for the long term, without needing a landlord's permission.",
      },
      {
        icon: "groups",
        title: "True community ownership",
        description: "This building will belong to the people of Penicuik, to shape and use as our needs change.",
      },
      {
        icon: "shield",
        title: "Future-proofing",
        description: "Whatever challenges come next, we'll have a stable base to keep supporting our community.",
      },
    ],
  },

  cta: {
    title: "This is our chance",
    description:
      "We can't do this alone. Every donation brings us closer to securing 42 John Street for generations to come.",
    buttonLabel: "Donate now",
    route: "/donate",
  },
} as const;
