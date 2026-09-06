const STORAGE_KEY = "fff_pending_donation";

export type PendingDonation = {
  amount: number;
  giftAid: boolean;
};

export function setPendingDonation(donation: PendingDonation) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(donation));
  } catch {
    return;
  }
}

export function takePendingDonation(): PendingDonation | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<PendingDonation>;

    if (typeof parsed.amount === "number" && typeof parsed.giftAid === "boolean") {
      return { amount: parsed.amount, giftAid: parsed.giftAid };
    }

    return null;
  } catch {
    return null;
  }
}
