import { renderWithProviders, screen } from "@/test/utils";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundPage } from "./BuildingFundPage";

describe("BuildingFundPage", () => {
  it("renders the hero, CTA and reasons", () => {
    renderWithProviders(<BuildingFundPage />);

    expect(
      screen.getByRole("heading", { name: BUILDING_FUND_CONTENT.hero.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: BUILDING_FUND_CONTENT.cta.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: BUILDING_FUND_CONTENT.reasons.title }),
    ).toBeInTheDocument();
  });
});
