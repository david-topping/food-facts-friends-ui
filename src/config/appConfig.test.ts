import { appConfig } from "./appConfig";

describe("appConfig", () => {
  it("exposes the parsed environment values", () => {
    expect(appConfig).toMatchObject({
      googleAnalyticsId: "G-TEST00000",
      googleMapsApiKey: "test-maps-key",
      stripePublishableKey: "pk_test_00000",
      apiBaseUrl: "http://api.test",
    });
  });

  it("leaves the cookie-banner override off when the flag is unset", () => {
    expect(appConfig.forceCookieBanner).toBe(false);
  });
});
