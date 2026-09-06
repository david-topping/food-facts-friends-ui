import { vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundBanner } from "./BuildingFundBanner";

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));
vi.mock("@/app/analytics/ga", () => ({ trackEvent }));

describe("BuildingFundBanner", () => {
  it("shows the message and a link to the building fund route", () => {
    renderWithProviders(<BuildingFundBanner />);

    expect(screen.getByText(BUILDING_FUND_CONTENT.banner.message)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: BUILDING_FUND_CONTENT.banner.linkLabel });
    expect(link).toHaveAttribute("href", BUILDING_FUND_CONTENT.banner.route);
  });

  it("reports a cta_click when the link is used", async () => {
    renderWithProviders(<BuildingFundBanner />);
    await userEvent.click(
      screen.getByRole("link", { name: BUILDING_FUND_CONTENT.banner.linkLabel }),
    );
    expect(trackEvent).toHaveBeenCalledWith("cta_click", { location: "building_fund_banner" });
  });
});
