export const DONATE_CONTENT = {
  hero: {
    title: "How you can help",
    subTitle:
      "Your generosity helps us support individuals and families in our community when they need it most",
  },

  financialDonation: {
    title: "Make a donation",
  },

  itemDonation: {
    title: "Donate Items",
    note: "These lists outline what we generally need the most. Please check with us before donating to see what supplies we currently need.",
    categories: [
      {
        title: "Food Items",
        items: [
          "Diluting Juice",
          "Long Life or Powdered Milk",
          "Soup",
          "Rice",
          "Pasta / Sauce",
          "Beans / Spaghetti",
          "Tinned Tomatoes",
          "Tinned Meat",
          "Tinned Fish",
          "Tinned Pies",
          "Puddings",
        ],
      },
      {
        title: "Toiletries",
        items: [
          "Deodorant",
          "Toilet Paper",
          "Shower Gel",
          "Shaving Gel",
          "Shampoo",
          "Soap",
          "Toothbrushes",
          "Toothpaste",
          "Hand Wipes",
        ],
      },
      {
        title: "Household Items",
        items: ["Laundry Liquid Detergent", "Laundry Powder", "Washing Up Liquid"],
      },
      {
        title: "Baby Supplies",
        items: ["Nappies", "Baby Wipes", "Baby Food"],
      },
      {
        title: "Feminine Products",
        items: ["Sanitary Towels", "Tampons"],
      },
      {
        title: "Health & Safety Supplies",
        items: ["Face Masks", "Hand Sanitiser"],
      },
    ],
    beforeDonating:
      "Please check our current needs and opening hours before bringing donations to ensure we can accept them.",
  },
} as const;
