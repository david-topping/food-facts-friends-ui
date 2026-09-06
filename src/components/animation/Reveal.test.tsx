import { renderWithProviders, screen } from "@/test/utils";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its child content", () => {
    renderWithProviders(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });

  it("accepts a stagger delay", () => {
    renderWithProviders(
      <Reveal delay={80}>
        <p>Delayed content</p>
      </Reveal>,
    );
    expect(screen.getByText("Delayed content")).toBeInTheDocument();
  });
});
