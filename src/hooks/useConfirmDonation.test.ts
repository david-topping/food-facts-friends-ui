import { beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useConfirmDonation } from "./useConfirmDonation";

const { useStripe, useElements } = vi.hoisted(() => ({
  useStripe: vi.fn(),
  useElements: vi.fn(),
}));

vi.mock("@stripe/react-stripe-js", () => ({ useStripe, useElements }));

const confirmPayment = vi.fn();

beforeEach(() => {
  confirmPayment.mockReset();
  useStripe.mockReturnValue({ confirmPayment });
  useElements.mockReturnValue({});
});

describe("useConfirmDonation", () => {
  it("throws when stripe is not ready", async () => {
    useStripe.mockReturnValue(null);
    const { result } = renderHook(() => useConfirmDonation());

    await expect(result.current.confirm()).rejects.toThrow("Stripe not ready");
  });

  it("calls confirmPayment with the success return_url", async () => {
    confirmPayment.mockResolvedValue({});
    const { result } = renderHook(() => useConfirmDonation());

    await act(async () => {
      await result.current.confirm();
    });

    expect(confirmPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        confirmParams: { return_url: `${window.location.origin}/donate/success` },
        redirect: "always",
      }),
    );
    expect(result.current.error).toBeNull();
  });

  it("stores the error returned by stripe", async () => {
    confirmPayment.mockResolvedValue({ error: { message: "Card declined" } });
    const { result } = renderHook(() => useConfirmDonation());

    await act(async () => {
      await result.current.confirm();
    });

    expect(result.current.error).toEqual({ message: "Card declined" });
    expect(result.current.loading).toBe(false);
  });
});
