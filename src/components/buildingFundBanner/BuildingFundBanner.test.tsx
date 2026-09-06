import { renderWithProviders, screen } from "@/test/utils";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundBanner } from "./BuildingFundBanner";

describe("BuildingFundBanner", () => {
  it("shows the message and a link to the building fund route", () => {
    renderWithProviders(<BuildingFundBanner />);

    expect(screen.getByText(BUILDING_FUND_CONTENT.banner.message)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: BUILDING_FUND_CONTENT.banner.linkLabel });
    expect(link).toHaveAttribute("href", BUILDING_FUND_CONTENT.banner.route);
  });
});
