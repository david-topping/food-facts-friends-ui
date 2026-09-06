import { elementsOptions } from "./elementsOptions";

describe("elementsOptions", () => {
  it("passes the client secret through and applies the stripe appearance", () => {
    const options = elementsOptions("cs_test_123");

    expect(options.clientSecret).toBe("cs_test_123");
    expect(options.appearance).toMatchObject({
      theme: "stripe",
      variables: { colorPrimary: "#2e7d32" },
    });
  });
});
