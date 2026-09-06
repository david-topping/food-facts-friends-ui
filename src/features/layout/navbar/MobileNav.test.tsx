import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { MobileNav } from "./MobileNav";

describe("MobileNav", () => {
  it("calls onMenuOpen when the menu button is pressed", async () => {
    const onMenuOpen = vi.fn();
    renderWithProviders(<MobileNav onMenuOpen={onMenuOpen} />);

    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(onMenuOpen).toHaveBeenCalledOnce();
  });

  it("links the wordmark home", () => {
    renderWithProviders(<MobileNav />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  });
});
