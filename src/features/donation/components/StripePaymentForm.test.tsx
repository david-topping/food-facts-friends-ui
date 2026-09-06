import { beforeEach, vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { StripePaymentForm } from "./StripePaymentForm";

const { useConfirmDonation } = vi.hoisted(() => ({ useConfirmDonation: vi.fn() }));
const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));

vi.mock("@/hooks/useConfirmDonation", () => ({ useConfirmDonation }));
vi.mock("@/app/analytics/ga", () => ({ trackEvent }));

beforeEach(() => {
  trackEvent.mockReset();
});

describe("StripePaymentForm", () => {
  it("renders the payment element and a donate button with the amount", () => {
    useConfirmDonation.mockReturnValue({ confirm: vi.fn(), loading: false, error: null });
    renderWithProviders(<StripePaymentForm amount={25} />);

    expect(screen.getByTestId("payment-element")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Donate £25" })).toBeInTheDocument();
  });

  it("calls confirm on submit", async () => {
    const confirm = vi.fn().mockResolvedValue(undefined);
    useConfirmDonation.mockReturnValue({ confirm, loading: false, error: null });
    renderWithProviders(<StripePaymentForm amount={10} />);

    await userEvent.click(screen.getByRole("button", { name: "Donate £10" }));
    expect(confirm).toHaveBeenCalledOnce();
  });

  it("shows the stripe error, a processing state, and reports a payment_error event", () => {
    useConfirmDonation.mockReturnValue({
      confirm: vi.fn(),
      loading: true,
      error: { message: "Card declined", code: "card_declined", decline_code: "generic_decline" },
    });
    renderWithProviders(<StripePaymentForm amount={10} />);

    expect(screen.getByText("Card declined")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /processing/i })).toBeDisabled();
    expect(trackEvent).toHaveBeenCalledWith("payment_error", {
      code: "card_declined",
      decline_code: "generic_decline",
    });
  });
});
