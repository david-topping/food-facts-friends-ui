import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("shows the desktop nav links when not collapsed", () => {
    renderWithProviders(<Navbar isCollapsed={false} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toBeInTheDocument();
  });

  it("shows the menu button when collapsed and calls onMenuOpen", async () => {
    const onMenuOpen = vi.fn();
    renderWithProviders(<Navbar isCollapsed onMenuOpen={onMenuOpen} />);

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(onMenuOpen).toHaveBeenCalledOnce();
  });
});
