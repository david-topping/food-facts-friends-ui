import { renderWithProviders, screen } from "@/test/utils";
import { ItemDonation } from "./ItemDonation";

const content = {
  title: "Donate Items",
  note: "Please check before donating.",
  beforeDonating: "Check our current needs.",
  categories: [
    { title: "Food", items: ["Rice", "Pasta"] },
    { title: "Toiletries", items: ["Soap"] },
  ],
} as const;

describe("ItemDonation", () => {
  it("renders every category and item", () => {
    renderWithProviders(<ItemDonation content={content} />);

    expect(screen.getByRole("heading", { name: "Donate Items" })).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Toiletries")).toBeInTheDocument();
    expect(screen.getByText("Rice")).toBeInTheDocument();
    expect(screen.getByText("Soap")).toBeInTheDocument();
  });
});
