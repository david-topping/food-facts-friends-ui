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

  it("accepts a direction override", () => {
    renderWithProviders(
      <Reveal direction="left">
        <p>From the left</p>
      </Reveal>,
    );
    expect(screen.getByText("From the left")).toBeInTheDocument();
  });
});
