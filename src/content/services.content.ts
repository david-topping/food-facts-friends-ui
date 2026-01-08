export const SERVICES_CONTENT = {
  hero: {
    title: "What We Offer",
    subtitle: "Offering food, practical support, and a welcoming community space for everyone",
  },

  services: [
    {
      id: "connection-cafe",
      sectionVariant: "default",
      subtitle: "Every Tuesday",
      title: "Connection Café",
      description:
        "Join us for a cuppa and a snack in a safe, welcoming space offering support for those affected by drug and alcohol challenges, alongside friendly support workers.",
      openingHours: [{ day: "Tuesday", time: "11:00am – 1:00pm" }],
    },
    {
      id: "fff-diner",
      sectionVariant: "dark",
      subtitle: "Coming January 2026",
      title: "Food Facts Friends Diner",
      description:
        "A friendly, affordable community diner offering a two-course meal for families. Adults dine for £2.50, and children eat free, in a welcoming neighbourhood setting.",
      openingHours: [{ day: "Tuesday", time: "5:00pm – 7:00pm" }],
    },
    {
      id: "community-hub",
      sectionVariant: "default",
      subtitle: undefined,
      title: "Community Hub",
      description: "A welcoming space offering support, advice, and access to essential services.",
      openingHours: [
        { day: "Monday", time: "10:00am – 3:00pm" },
        { day: "Tuesday", time: "10:00am – 3:00pm" },
        { day: "Wednesday", time: "10:00am – 3:00pm" },
        { day: "Thursday", time: "10:00am – 3:00pm" },
        { day: "Friday", time: "10:00am – 3:00pm" },
        { day: "Saturday", time: "10:00am – 12:00 noon" },
        { day: "Sunday", time: "Closed" },
      ],
    },
    {
      id: "midlothian-pantry",
      sectionVariant: "dark",
      subtitle: undefined,
      title: "Midlothian Pantry",
      description:
        "Affordable food and essentials for individuals and families needing extra support.",
      openingHours: [
        { day: "Monday", time: "11am – 3:00pm" },
        { day: "Tuesday", time: "Closed" },
        { day: "Wednesday", time: "11am – 3:00pm" },
        { day: "Thursday", time: "Closed" },
        { day: "Friday", time: "11am – 3:00pm" },
        { day: "Saturday", time: "10:00am – 12:00 noon" },
        { day: "Sunday", time: "Closed" },
      ],
    },
  ],
} as const;
