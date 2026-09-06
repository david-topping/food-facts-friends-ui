import { renderWithProviders, screen } from "@/test/utils";
import { HomeHeroIntro } from "./HeroIntro";

describe("HomeHeroIntro", () => {
  it("renders the title, statement and logo", () => {
    renderWithProviders(
      <HomeHeroIntro title="Food Facts Friends" subText="A community hub." logo="/logo.webp" />,
    );

    expect(screen.getAllByRole("heading", { name: "Food Facts Friends" }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText("A community hub.").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img", { name: /logo/i }).length).toBeGreaterThan(0);
  });
});
