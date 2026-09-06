import { renderWithProviders, screen } from "@/test/utils";
import { HomeHero } from "./HeroIntro";

describe("HomeHero", () => {
  it("renders the title, statement and calls to action", () => {
    renderWithProviders(
      <HomeHero title="Food Facts Friends" statement="A community hub." image="/hero.webp" />,
    );

    expect(screen.getByRole("heading", { name: "Food Facts Friends" })).toBeInTheDocument();
    expect(screen.getByText("A community hub.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /how to donate/i })).toHaveAttribute("href", "/donate");
    expect(screen.getByRole("link", { name: /what we offer/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });
});
