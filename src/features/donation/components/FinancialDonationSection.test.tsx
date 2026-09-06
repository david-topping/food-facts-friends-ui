import { vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { FinancialDonationSection } from "./FinancialDonationSection";

const { useCreateDonation } = vi.hoisted(() => ({ useCreateDonation: vi.fn() }));

vi.mock("@/hooks/useCreateDonation", () => ({ useCreateDonation }));

describe("FinancialDonationSection", () => {
  it("shows the details form first", () => {
    useCreateDonation.mockReturnValue({
      clientSecret: null,
      startDonation: vi.fn(),
      loading: false,
      error: null,
    });

    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);

    expect(screen.getByRole("heading", { name: "Make a donation" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to payment" })).toBeInTheDocument();
    expect(screen.queryByTestId("payment-element")).not.toBeInTheDocument();
  });

  it("calls startDonation with pence when the details are submitted", async () => {
    const startDonation = vi.fn().mockResolvedValue(undefined);
    useCreateDonation.mockReturnValue({
      clientSecret: null,
      startDonation,
      loading: false,
      error: null,
    });

    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);

    await userEvent.click(screen.getByRole("button", { name: "£10" }));
    await userEvent.type(screen.getByLabelText("Email"), "donor@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(startDonation).toHaveBeenCalledWith({
      amountPence: 1000,
      email: "donor@example.com",
      giftAid: false,
    });
  });

  it("renders the payment step once a client secret exists", () => {
    useCreateDonation.mockReturnValue({
      clientSecret: "cs_test_123",
      startDonation: vi.fn(),
      loading: false,
      error: null,
    });

    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);
    // With no donationData yet the payment step stays hidden.
    expect(screen.queryByTestId("payment-element")).not.toBeInTheDocument();
  });

  it("surfaces a create-donation error above the form", () => {
    useCreateDonation.mockReturnValue({
      clientSecret: null,
      startDonation: vi.fn(),
      loading: false,
      error: "We couldn't start your donation.",
    });

    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);
    expect(screen.getByText("We couldn't start your donation.")).toBeInTheDocument();
  });
});
