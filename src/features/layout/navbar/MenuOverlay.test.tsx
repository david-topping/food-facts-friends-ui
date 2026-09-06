import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { MobileMenuOverlay } from "./MenuOverlay";

describe("MobileMenuOverlay", () => {
  it("is not visible when closed", () => {
    renderWithProviders(<MobileMenuOverlay open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
  });

  it("lists the nav routes when open", () => {
    renderWithProviders(<MobileMenuOverlay open onClose={vi.fn()} />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Our Supporters" })).toBeInTheDocument();
  });

  it("closes when a link or the close button is used", async () => {
    const onClose = vi.fn();
    renderWithProviders(<MobileMenuOverlay open onClose={onClose} />);

    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    await userEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
