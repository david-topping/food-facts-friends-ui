import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { MobileMenuOverlay } from "./MenuOverlay";

describe("MobileMenuOverlay", () => {
  it("is not visible when closed", () => {
    renderWithProviders(<MobileMenuOverlay open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("link", { name: "Our Supporters" })).not.toBeInTheDocument();
  });

  it("lists the nav routes and a donate action when open", () => {
    renderWithProviders(<MobileMenuOverlay open onClose={vi.fn()} />);
    expect(screen.getByRole("link", { name: "Our Supporters" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Donate" })).toHaveAttribute("href", "/donate");
  });

  it("closes when a link or the close button is used", async () => {
    const onClose = vi.fn();
    renderWithProviders(<MobileMenuOverlay open onClose={onClose} />);

    await userEvent.click(screen.getByRole("link", { name: "Our Supporters" }));
    await userEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
