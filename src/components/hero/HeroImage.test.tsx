import { renderWithProviders } from "@/test/utils";
import { HeroImage } from "./HeroImage";

describe("HeroImage", () => {
  it("renders a section with the image as a background", () => {
    const { container } = renderWithProviders(<HeroImage image="/hero.webp" />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveStyle({ backgroundImage: "url(/hero.webp)" });
  });

  it("accepts a custom height", () => {
    const { container } = renderWithProviders(<HeroImage image="/hero.webp" height="50vh" />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
