import { useState } from "react";
import { beforeEach, vi } from "vitest";
import { renderWithProviders, screen, userEvent, waitFor } from "@/test/utils";
import { useCreateDonation } from "@/hooks/useCreateDonation";
import { FinancialDonationSection } from "./FinancialDonationSection";

vi.mock("@/hooks/useCreateDonation");

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));
const { setPendingDonation } = vi.hoisted(() => ({ setPendingDonation: vi.fn() }));

vi.mock("@/app/analytics/ga", () => ({ trackEvent }));
vi.mock("../pendingDonation", () => ({ setPendingDonation }));

function useFakeCreateDonation() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  return {
    clientSecret,
    loading: false,
    error: null as string | null,
    startDonation: async () => setClientSecret("cs_test_123"),
  };
}

beforeEach(() => {
  trackEvent.mockReset();
  setPendingDonation.mockReset();
  vi.mocked(useCreateDonation).mockImplementation(useFakeCreateDonation);
});

async function fillAndSubmit() {
  await userEvent.click(screen.getByRole("button", { name: "£10" }));
  await userEvent.type(screen.getByLabelText("Email"), "donor@example.com");
  await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));
}

describe("FinancialDonationSection", () => {
  it("shows the details form first", () => {
    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);
    expect(screen.getByRole("button", { name: "Continue to payment" })).toBeInTheDocument();
    expect(screen.queryByTestId("payment-element")).not.toBeInTheDocument();
  });

  it("fires begin_checkout on submit and advances to the payment step", async () => {
    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);
    await fillAndSubmit();

    expect(trackEvent).toHaveBeenCalledWith("begin_checkout", {
      currency: "GBP",
      value: 10,
      gift_aid: false,
    });

    expect(await screen.findByTestId("payment-element")).toBeInTheDocument();
  });

  it("stashes the pending donation and fires add_payment_info at the payment step", async () => {
    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);
    await fillAndSubmit();

    await waitFor(() =>
      expect(setPendingDonation).toHaveBeenCalledWith({ amount: 10, giftAid: false }),
    );
    expect(trackEvent).toHaveBeenCalledWith("add_payment_info", {
      currency: "GBP",
      value: 10,
      gift_aid: false,
    });
  });

  it("surfaces and reports a create-donation error", () => {
    vi.mocked(useCreateDonation).mockReturnValue({
      clientSecret: null,
      startDonation: vi.fn(),
      loading: false,
      error: "We couldn't start your donation.",
    });

    renderWithProviders(<FinancialDonationSection content={{ title: "Make a donation" }} />);

    expect(screen.getByText("We couldn't start your donation.")).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith("donation_start_error");
  });
});
