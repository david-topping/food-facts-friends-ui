import { Routes, Route, useLocation } from "react-router-dom";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { MobileNav } from "./MobileNav";

function LocationProbe() {
  return <div data-testid="pathname">{useLocation().pathname}</div>;
}

describe("MobileNav", () => {
  it("calls onMenuOpen when the menu button is pressed", async () => {
    const onMenuOpen = vi.fn();
    renderWithProviders(<MobileNav onMenuOpen={onMenuOpen} />);

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(onMenuOpen).toHaveBeenCalledOnce();
  });

  it("navigates home when the logo is clicked", async () => {
    renderWithProviders(
      <Routes>
        <Route
          path="*"
          element={
            <>
              <MobileNav />
              <LocationProbe />
            </>
          }
        />
      </Routes>,
      { initialEntries: ["/start"] },
    );

    expect(screen.getByTestId("pathname")).toHaveTextContent("/start");
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");

    await userEvent.click(screen.getByRole("img", { name: /logo/i }));
    expect(screen.getByTestId("pathname")).toHaveTextContent("/");
  });
});
