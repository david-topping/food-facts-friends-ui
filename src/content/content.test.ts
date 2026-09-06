import { BUILDING_FUND_CONTENT } from "./buildingFund.content";
import { CONTACT_CONTENT } from "./contact.content";
import { COOKIES_CONTENT } from "./cookies.content";
import { DONATE_CONTENT, DONATION_SUCCESS_CONTENT } from "./donate.content";
import { GLOBAL_CONTENT } from "./global.content";
import { HOME_CONTENT } from "./home.content";
import { SERVICES_CONTENT } from "./services.content";
import { SUPPORTERS_CONTENT } from "./supporters.content";

describe("content modules", () => {
  it("expose the copy used across the site", () => {
    expect(BUILDING_FUND_CONTENT.banner.route).toBeTruthy();
    expect(CONTACT_CONTENT.hero.title).toBeTruthy();
    expect(COOKIES_CONTENT.banner.actions.acceptAll).toBeTruthy();
    expect(DONATE_CONTENT.financialDonation.title).toBeTruthy();
    expect(HOME_CONTENT.hero.title).toBeTruthy();
    expect(SERVICES_CONTENT.services.length).toBeGreaterThan(0);
    expect(SUPPORTERS_CONTENT.hero.title).toBeTruthy();
  });

  it("builds the footer copyright line for a given year", () => {
    expect(GLOBAL_CONTENT.copyright(2026)).toContain("2026");
  });

  it("has a success-page entry for every redirect status", () => {
    for (const key of ["succeeded", "failed", "canceled", "unknown"] as const) {
      expect(DONATION_SUCCESS_CONTENT[key].title).toBeTruthy();
      expect(DONATION_SUCCESS_CONTENT[key].primaryAction.to).toBeTruthy();
    }
  });
});
