import { beforeEach } from "vitest";
import { setPendingDonation, takePendingDonation } from "./pendingDonation";

beforeEach(() => {
  sessionStorage.clear();
});

describe("pendingDonation", () => {
  it("round-trips a stored donation", () => {
    setPendingDonation({ amount: 25, giftAid: true });
    expect(takePendingDonation()).toEqual({ amount: 25, giftAid: true });
  });

  it("clears the value after it is taken", () => {
    setPendingDonation({ amount: 10, giftAid: false });
    takePendingDonation();
    expect(takePendingDonation()).toBeNull();
  });

  it("returns null when nothing is stored", () => {
    expect(takePendingDonation()).toBeNull();
  });

  it("returns null for a malformed value", () => {
    sessionStorage.setItem("fff_pending_donation", "not json");
    expect(takePendingDonation()).toBeNull();
  });

  it("returns null when the shape is wrong", () => {
    sessionStorage.setItem("fff_pending_donation", JSON.stringify({ amount: "lots" }));
    expect(takePendingDonation()).toBeNull();
  });
});
