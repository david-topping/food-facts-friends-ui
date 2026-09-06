import { afterEach, beforeEach, vi } from "vitest";
import { createDonation, type CreateDonationRequest } from "./donations.api";

const payload: CreateDonationRequest = {
  amountPence: 1000,
  email: "a@b.com",
  giftAid: false,
};

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("createDonation", () => {
  it("POSTs the payload as JSON to the donations endpoint", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ clientSecret: "cs_test_123" }),
    });

    const result = await createDonation(payload);

    expect(result).toEqual({ clientSecret: "cs_test_123" });
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  it("throws when the response is not ok", async () => {
    fetchMock.mockResolvedValue({ ok: false, json: () => Promise.resolve({}) });

    await expect(createDonation(payload)).rejects.toThrow("Failed to create donation");
  });
});
