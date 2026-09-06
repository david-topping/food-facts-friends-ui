import { PRESET_AMOUNTS, donationDetailsFormSchema } from "./DonationDetailsForm.schema";

const validGiftAid = {
  firstName: "Sam",
  lastName: "Taylor",
  addressLine1: "1 High Street",
  city: "Edinburgh",
  postcode: "EH1 1AA",
  country: "United Kingdom",
};

describe("PRESET_AMOUNTS", () => {
  it("offers £5, £10 and £20", () => {
    expect(PRESET_AMOUNTS).toEqual([5, 10, 20]);
  });
});

describe("donationDetailsFormSchema — amount", () => {
  it("coerces a numeric string to a number", () => {
    const result = donationDetailsFormSchema.parse({
      amount: "10",
      email: "a@b.com",
      giftAid: false,
    });
    expect(result).toMatchObject({ amount: 10 });
  });

  it("accepts a number directly", () => {
    const result = donationDetailsFormSchema.parse({
      amount: 20,
      email: "a@b.com",
      giftAid: false,
    });
    expect(result.amount).toBe(20);
  });

  it.each([
    ["not a number", "abc", "Enter a valid amount"],
    ["below the minimum", "4", "Donation amount must be greater than 5"],
    ["above the maximum", "1001", "Donation amount must be £1000 or less"],
  ])("rejects an amount that is %s", (_label, amount, message) => {
    const result = donationDetailsFormSchema.safeParse({
      amount,
      email: "a@b.com",
      giftAid: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(message);
  });

  it.each([["5"], ["1000"]])("accepts the boundary amount %s", (amount) => {
    expect(
      donationDetailsFormSchema.safeParse({ amount, email: "a@b.com", giftAid: false }).success,
    ).toBe(true);
  });
});

describe("donationDetailsFormSchema — email", () => {
  it("trims and rejects an invalid email", () => {
    const result = donationDetailsFormSchema.safeParse({
      amount: "10",
      email: "nope",
      giftAid: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Enter a valid email");
  });

  it("trims a valid email", () => {
    const result = donationDetailsFormSchema.parse({
      amount: "10",
      email: "  a@b.com  ",
      giftAid: false,
    });
    expect(result.email).toBe("a@b.com");
  });
});

describe("donationDetailsFormSchema — gift aid branch", () => {
  it("does not require gift aid details when giftAid is false", () => {
    expect(
      donationDetailsFormSchema.safeParse({ amount: "10", email: "a@b.com", giftAid: false })
        .success,
    ).toBe(true);
  });

  it("requires gift aid details when giftAid is true", () => {
    const result = donationDetailsFormSchema.safeParse({
      amount: "10",
      email: "a@b.com",
      giftAid: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a full gift aid submission", () => {
    const result = donationDetailsFormSchema.safeParse({
      amount: "10",
      email: "a@b.com",
      giftAid: true,
      giftAidDetails: validGiftAid,
    });
    expect(result.success).toBe(true);
  });

  it("reports nested gift aid field issues under giftAidDetails", () => {
    const result = donationDetailsFormSchema.safeParse({
      amount: "10",
      email: "a@b.com",
      giftAid: true,
      giftAidDetails: { ...validGiftAid, firstName: "" },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["giftAidDetails", "firstName"]);
  });
});
