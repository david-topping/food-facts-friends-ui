import { renderWithProviders, screen } from "@/test/utils";
import { HeroText } from "./HeroText";

describe("HeroText", () => {
  it("renders the title and subtitle", () => {
    renderWithProviders(<HeroText title="How you can help" subtitle="Your generosity matters" />);
    expect(screen.getByRole("heading", { name: "How you can help" })).toBeInTheDocument();
    expect(screen.getByText("Your generosity matters")).toBeInTheDocument();
  });

  it("supports a variant override", () => {
    renderWithProviders(<HeroText title="Title" subtitle="Subtitle" variant="light" />);
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
  });
});
