import { renderWithProviders, screen } from "@/test/utils";
import { GLOBAL_CONTENT } from "@/content/global.content";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the charity number and copyright", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(GLOBAL_CONTENT.charityNumber)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it("links out to each social profile", () => {
    renderWithProviders(<Footer />);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(
      expect.arrayContaining([
        GLOBAL_CONTENT.socialMedia.facebook,
        GLOBAL_CONTENT.socialMedia.linkedin,
        GLOBAL_CONTENT.socialMedia.instagram,
      ]),
    );
  });
});
