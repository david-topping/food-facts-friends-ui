import { beforeEach } from "vitest";
import { clearCookieConsent, getCookieConsent, setCookieConsent } from "./cookieConsent";

beforeEach(() => {
  clearCookieConsent();
});

describe("getCookieConsent", () => {
  it("returns null when no consent cookie is set", () => {
    expect(getCookieConsent()).toBeNull();
  });

  it("round-trips an 'accepted' choice", () => {
    setCookieConsent("accepted");
    expect(getCookieConsent()).toBe("accepted");
  });

  it("round-trips an 'essential' choice", () => {
    setCookieConsent("essential");
    expect(getCookieConsent()).toBe("essential");
  });

  it("maps the legacy 'rejected' value to 'essential'", () => {
    document.cookie = "fff_cookie_consent=rejected; path=/";
    expect(getCookieConsent()).toBe("essential");
  });

  it("returns null for an unrecognised value", () => {
    document.cookie = "fff_cookie_consent=banana; path=/";
    expect(getCookieConsent()).toBeNull();
  });
});

describe("clearCookieConsent", () => {
  it("removes a previously set choice", () => {
    setCookieConsent("accepted");
    clearCookieConsent();
    expect(getCookieConsent()).toBeNull();
  });
});
