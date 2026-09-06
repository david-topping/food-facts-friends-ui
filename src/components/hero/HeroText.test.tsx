import { renderWithProviders, screen } from "@/test/utils";
import { HeroText } from "./HeroText";

describe("HeroText", () => {
  it("renders the title and subtitle", () => {
    renderWithProviders(<HeroText title="How you can help" subtitle="Your generosity matters" />);
    expect(screen.getByRole("heading", { name: "How you can help" })).toBeInTheDocument();
    expect(screen.getByText("Your generosity matters")).toBeInTheDocument();
  });

  it("renders an eyebrow when provided", () => {
    renderWithProviders(<HeroText eyebrow="Donate" title="Title" subtitle="Subtitle" />);
    expect(screen.getByText("Donate")).toBeInTheDocument();
  });
});
