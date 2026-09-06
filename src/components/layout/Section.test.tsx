import { renderWithProviders, screen } from "@/test/utils";
import { Section } from "./Section";

describe("Section", () => {
  it("renders children inside a section element", () => {
    const { container } = renderWithProviders(
      <Section>
        <p>Body</p>
      </Section>,
    );
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it.each(["default", "light", "main", "dark"] as const)("renders the %s variant", (variant) => {
    renderWithProviders(
      <Section variant={variant} maxWidth="sm">
        <p>{variant}</p>
      </Section>,
    );
    expect(screen.getByText(variant)).toBeInTheDocument();
  });
});
