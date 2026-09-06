import { Routes, Route, useLocation } from "react-router-dom";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundCta } from "./BuildingFundCta";

function LocationProbe() {
  return <div data-testid="pathname">{useLocation().pathname}</div>;
}

describe("BuildingFundCta", () => {
  it("renders the CTA copy", () => {
    renderWithProviders(<BuildingFundCta />);
    expect(
      screen.getByRole("heading", { name: BUILDING_FUND_CONTENT.cta.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(BUILDING_FUND_CONTENT.cta.description)).toBeInTheDocument();
  });

  it("navigates to the donate route on click", async () => {
    renderWithProviders(
      <Routes>
        <Route
          path="*"
          element={
            <>
              <BuildingFundCta />
              <LocationProbe />
            </>
          }
        />
      </Routes>,
      { initialEntries: ["/building-fund"] },
    );

    await userEvent.click(
      screen.getByRole("button", { name: BUILDING_FUND_CONTENT.cta.buttonLabel }),
    );
    expect(screen.getByTestId("pathname")).toHaveTextContent(BUILDING_FUND_CONTENT.cta.route);
  });
});
