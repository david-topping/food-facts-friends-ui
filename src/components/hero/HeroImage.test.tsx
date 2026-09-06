import { renderWithProviders, screen } from "@/test/utils";
import { HeroImage } from "./HeroImage";

describe("HeroImage", () => {
  it("renders a section with the image as a background", () => {
    const { container } = renderWithProviders(<HeroImage image="/hero.webp" />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveStyle({ backgroundImage: "url(/hero.webp)" });
  });

  it("renders overlaid content when provided", () => {
    renderWithProviders(
      <HeroImage image="/hero.webp">
        <h1>Hero headline</h1>
      </HeroImage>,
    );
    expect(screen.getByRole("heading", { name: "Hero headline" })).toBeInTheDocument();
  });

  it("can disable the gradient overlay", () => {
    const { container } = renderWithProviders(<HeroImage image="/hero.webp" overlay={false} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
