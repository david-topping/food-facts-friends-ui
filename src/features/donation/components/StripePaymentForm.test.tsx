import { vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { StripePaymentForm } from "./StripePaymentForm";

const { useConfirmDonation } = vi.hoisted(() => ({ useConfirmDonation: vi.fn() }));

vi.mock("@/hooks/useConfirmDonation", () => ({ useConfirmDonation }));

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

  it("shows the stripe error and a processing state", () => {
    useConfirmDonation.mockReturnValue({
      confirm: vi.fn(),
      loading: true,
      error: { message: "Card declined" },
    });
    renderWithProviders(<StripePaymentForm amount={10} />);

    expect(screen.getByText("Card declined")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /processing/i })).toBeDisabled();
  });
});
