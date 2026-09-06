import { renderWithProviders, screen } from "@/test/utils";
import { SUPPORTERS_CONTENT } from "@/content/supporters.content";
import { SupportersPage } from "./SupportersPage";

describe("SupportersPage", () => {
  it("renders the hero and the supporter logo gallery", () => {
    renderWithProviders(<SupportersPage />);

    expect(
      screen.getByRole("heading", { name: SUPPORTERS_CONTENT.hero.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Supporter logo" }).length).toBeGreaterThan(0);
  });
});
