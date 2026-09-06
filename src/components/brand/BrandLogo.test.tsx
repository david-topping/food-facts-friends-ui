import { renderWithProviders, screen } from "@/test/utils";
import { BrandLogo } from "./BrandLogo";

describe("BrandLogo", () => {
  it("renders an image with the given source", () => {
    renderWithProviders(<BrandLogo src="/logo.webp" />);
    const img = screen.getByRole("img", { name: "Brand logo" });
    expect(img).toHaveAttribute("src", "/logo.webp");
  });

  it("uses a custom alt text and size", () => {
    renderWithProviders(<BrandLogo src="/logo.webp" alt="Food Facts Friends" size="xs" />);
    expect(screen.getByRole("img", { name: "Food Facts Friends" })).toBeInTheDocument();
  });
});
