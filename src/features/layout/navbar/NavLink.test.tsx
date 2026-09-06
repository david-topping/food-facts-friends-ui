import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("renders a router link to the given path", () => {
    renderWithProviders(<NavLink to="/contact" label="Contact Us" />);
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  });

  it("fires onClick when pressed", async () => {
    const onClick = vi.fn();
    renderWithProviders(<NavLink to="/" label="Home" active onClick={onClick} />);

    await userEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
