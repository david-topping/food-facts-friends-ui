import { beforeEach, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCreateDonation } from "./useCreateDonation";

const { createDonation } = vi.hoisted(() => ({ createDonation: vi.fn() }));

vi.mock("@/api/donations.api", () => ({ createDonation }));

const payload = { amountPence: 1000, email: "a@b.com", giftAid: false } as const;

beforeEach(() => {
  createDonation.mockReset();
});

describe("useCreateDonation", () => {
  it("stores the client secret returned by the API", async () => {
    createDonation.mockResolvedValue({ clientSecret: "cs_test_123" });
    const { result } = renderHook(() => useCreateDonation());

    await act(async () => {
      await result.current.startDonation(payload);
    });

    expect(result.current.clientSecret).toBe("cs_test_123");
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("surfaces a friendly error when the request fails", async () => {
    createDonation.mockRejectedValue(new Error("network"));
    const { result } = renderHook(() => useCreateDonation());

    await act(async () => {
      await result.current.startDonation(payload);
    });

    await waitFor(() => {
      expect(result.current.error).toMatch(/couldn't start your donation/i);
    });
    expect(result.current.clientSecret).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
