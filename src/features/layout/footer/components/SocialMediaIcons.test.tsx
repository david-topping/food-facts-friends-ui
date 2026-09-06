import { renderWithProviders, screen } from "@/test/utils";
import { SocialMediaIcons } from "./SocialMediaIcons";

describe("SocialMediaIcons", () => {
  it("renders a labelled link only for each url provided", () => {
    renderWithProviders(
      <SocialMediaIcons facebookUrl="https://fb.test" instagramUrl="https://ig.test" />,
    );

    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://fb.test",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://ig.test",
    );
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
  });

  it("renders nothing when no urls are given", () => {
    const { container } = renderWithProviders(<SocialMediaIcons />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});
