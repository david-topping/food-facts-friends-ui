import { renderWithProviders, screen } from "@/test/utils";
import { SupportersGallery } from "./SupportersGallery";

describe("SupportersGallery", () => {
  it("renders an image for each logo", () => {
    renderWithProviders(<SupportersGallery logos={["/a.png", "/b.png", "/c.png"]} />);
    expect(screen.getAllByRole("img", { name: "Supporter logo" })).toHaveLength(3);
  });

  it("renders nothing for an empty list", () => {
    renderWithProviders(<SupportersGallery logos={[]} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
