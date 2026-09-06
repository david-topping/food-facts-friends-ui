import { beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { clearCookieConsent, getCookieConsent, setCookieConsent } from "./cookieConsent";
import { useCookieConsent } from "./useCookieConsent";

beforeEach(() => {
  clearCookieConsent();
});

describe("useCookieConsent", () => {
  it("shows the banner when no choice has been stored", () => {
    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.consent).toBeNull();
    expect(result.current.showBanner).toBe(true);
    expect(result.current.hasConsent).toBe(false);
  });

  it("reads an existing choice from the cookie on mount", () => {
    setCookieConsent("accepted");
    const { result } = renderHook(() => useCookieConsent());

    expect(result.current.consent).toBe("accepted");
    expect(result.current.showBanner).toBe(false);
    expect(result.current.hasConsent).toBe(true);
  });

  it("acceptAll stores 'accepted' and hides the banner", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => result.current.acceptAll());

    expect(result.current.consent).toBe("accepted");
    expect(result.current.hasConsent).toBe(true);
    expect(result.current.showBanner).toBe(false);
    expect(getCookieConsent()).toBe("accepted");
  });

  it("acceptEssential stores 'essential' without granting full consent", () => {
    const { result } = renderHook(() => useCookieConsent());

    act(() => result.current.acceptEssential());

    expect(result.current.consent).toBe("essential");
    expect(result.current.hasConsent).toBe(false);
    expect(result.current.showBanner).toBe(false);
    expect(getCookieConsent()).toBe("essential");
  });
});
