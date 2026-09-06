import { giftAidDetailsSchema } from "./GiftAidDetailsFields.schema";

const base = {
  firstName: "Sam",
  lastName: "Taylor",
  addressLine1: "1 High Street",
  city: "Edinburgh",
  postcode: "EH1 1AA",
  country: "United Kingdom",
};

describe("giftAidDetailsSchema", () => {
  it("accepts a complete set of details", () => {
    expect(giftAidDetailsSchema.safeParse(base).success).toBe(true);
  });

  it("treats addressLine2 as optional", () => {
    const result = giftAidDetailsSchema.safeParse({ ...base, addressLine2: undefined });
    expect(result.success).toBe(true);
  });

  it.each([
    ["firstName", "First name is required"],
    ["lastName", "Last name is required"],
    ["addressLine1", "Address line 1 is required"],
    ["city", "City is required"],
    ["country", "Country is required"],
  ])("requires %s", (field, message) => {
    const result = giftAidDetailsSchema.safeParse({ ...base, [field]: "  " });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(message);
  });

  it.each([["EH1 1AA"], ["eh11aa"], ["G2 9AG"], ["SW1A1AA"]])(
    "accepts the UK postcode %s",
    (postcode) => {
      expect(giftAidDetailsSchema.safeParse({ ...base, postcode }).success).toBe(true);
    },
  );

  it.each([["12345"], ["not a postcode"], [""]])("rejects the postcode %j", (postcode) => {
    const result = giftAidDetailsSchema.safeParse({ ...base, postcode });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from values", () => {
    const result = giftAidDetailsSchema.parse({ ...base, firstName: "  Sam  " });
    expect(result.firstName).toBe("Sam");
  });
});
