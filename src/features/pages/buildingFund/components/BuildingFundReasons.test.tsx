import { renderWithProviders, screen } from "@/test/utils";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundReasons } from "./BuildingFundReasons";

describe("BuildingFundReasons", () => {
  it("renders the section title and every reason", () => {
    renderWithProviders(<BuildingFundReasons />);

    expect(
      screen.getByRole("heading", { name: BUILDING_FUND_CONTENT.reasons.title }),
    ).toBeInTheDocument();

    for (const reason of BUILDING_FUND_CONTENT.reasons.items) {
      expect(screen.getByText(reason.title)).toBeInTheDocument();
    }
  });
});
