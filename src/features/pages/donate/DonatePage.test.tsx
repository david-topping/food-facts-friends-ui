import { vi } from "vitest";
import { renderWithProviders, screen } from "@/test/utils";
import { DONATE_CONTENT } from "@/content/donate.content";
import { DonatePage } from "./DonatePage";

vi.mock("@/hooks/useCreateDonation", () => ({
  useCreateDonation: () => ({
    clientSecret: null,
    startDonation: vi.fn(),
    loading: false,
    error: null,
  }),
}));

describe("DonatePage", () => {
  it("renders the hero, donation form and item donation sections", () => {
    renderWithProviders(<DonatePage />);

    expect(screen.getByRole("heading", { name: DONATE_CONTENT.hero.title })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: DONATE_CONTENT.financialDonation.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: DONATE_CONTENT.itemDonation.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue to payment/i })).toBeInTheDocument();
  });
});
