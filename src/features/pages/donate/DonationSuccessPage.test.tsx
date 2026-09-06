import { beforeEach, vi } from "vitest";
import { renderWithProviders, screen } from "@/test/utils";
import { DONATION_SUCCESS_CONTENT } from "@/content/donate.content";
import { DonationSuccessPage } from "./DonationSuccessPage";

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));
const { takePendingDonation } = vi.hoisted(() => ({ takePendingDonation: vi.fn() }));

vi.mock("@/app/analytics/ga", () => ({ trackEvent }));
vi.mock("@/features/donation/pendingDonation", () => ({ takePendingDonation }));

beforeEach(() => {
  trackEvent.mockReset();
  takePendingDonation.mockReset();
});

describe("DonationSuccessPage", () => {
  it.each([
    ["succeeded", DONATION_SUCCESS_CONTENT.succeeded.title],
    ["failed", DONATION_SUCCESS_CONTENT.failed.title],
    ["canceled", DONATION_SUCCESS_CONTENT.canceled.title],
  ])("shows the %s message from the redirect_status query", (status, title) => {
    renderWithProviders(<DonationSuccessPage />, {
      initialEntries: [`/donate/success?redirect_status=${status}`],
    });
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  it("falls back to the unknown state when no status is given", () => {
    renderWithProviders(<DonationSuccessPage />, { initialEntries: ["/donate/success"] });
    expect(
      screen.getByRole("heading", { name: DONATION_SUCCESS_CONTENT.unknown.title }),
    ).toBeInTheDocument();
    expect(trackEvent).not.toHaveBeenCalled();
  });

  it("fires a purchase event with the pending amount and payment intent", () => {
    takePendingDonation.mockReturnValue({ amount: 25, giftAid: true });
    renderWithProviders(<DonationSuccessPage />, {
      initialEntries: ["/donate/success?redirect_status=succeeded&payment_intent=pi_123"],
    });

    expect(trackEvent).toHaveBeenCalledWith("purchase", {
      transaction_id: "pi_123",
      currency: "GBP",
      value: 25,
      gift_aid: true,
    });
  });

  it("fires a purchase event with no value when nothing was stored", () => {
    takePendingDonation.mockReturnValue(null);
    renderWithProviders(<DonationSuccessPage />, {
      initialEntries: ["/donate/success?redirect_status=succeeded"],
    });

    expect(trackEvent).toHaveBeenCalledWith("purchase", {
      transaction_id: undefined,
      currency: "GBP",
      value: undefined,
      gift_aid: undefined,
    });
  });

  it.each([
    ["failed", "donation_failed"],
    ["canceled", "donation_cancelled"],
  ])("fires %s -> %s", (status, eventName) => {
    takePendingDonation.mockReturnValue(null);
    renderWithProviders(<DonationSuccessPage />, {
      initialEntries: [`/donate/success?redirect_status=${status}&payment_intent=pi_9`],
    });
    expect(trackEvent).toHaveBeenCalledWith(eventName, { transaction_id: "pi_9" });
  });
});
