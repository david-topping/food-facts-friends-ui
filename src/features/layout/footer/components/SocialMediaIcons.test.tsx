import { renderWithProviders, screen } from "@/test/utils";
import { SocialMediaIcons } from "./SocialMediaIcons";

describe("SocialMediaIcons", () => {
  it("renders a link only for each url provided", () => {
    renderWithProviders(
      <SocialMediaIcons facebookUrl="https://fb.test" instagramUrl="https://ig.test" />,
    );

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["https://fb.test", "https://ig.test"]);
  });

  it("renders nothing when no urls are given", () => {
    const { container } = renderWithProviders(<SocialMediaIcons />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});
