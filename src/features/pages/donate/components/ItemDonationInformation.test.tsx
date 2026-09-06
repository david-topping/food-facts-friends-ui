import { renderWithProviders, screen } from "@/test/utils";
import { ItemDonationInformation } from "./ItemDonationInformation";

describe("ItemDonationInformation", () => {
  it("uses the default title", () => {
    renderWithProviders(<ItemDonationInformation description="Check our needs first." />);
    expect(screen.getByRole("heading", { name: "Before donating" })).toBeInTheDocument();
    expect(screen.getByText("Check our needs first.")).toBeInTheDocument();
  });

  it("accepts a custom title", () => {
    renderWithProviders(<ItemDonationInformation title="Heads up" description="Text" />);
    expect(screen.getByRole("heading", { name: "Heads up" })).toBeInTheDocument();
  });
});
