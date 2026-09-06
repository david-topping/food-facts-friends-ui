import { renderWithProviders, screen } from "@/test/utils";
import { EventSection } from "./EventSection";

describe("EventSection", () => {
  it("renders title, description and children", () => {
    renderWithProviders(
      <EventSection title="Connection Café" description="Come along for a cuppa.">
        <p>Opening hours</p>
      </EventSection>,
    );

    expect(screen.getByRole("heading", { name: "Connection Café" })).toBeInTheDocument();
    expect(screen.getByText("Come along for a cuppa.")).toBeInTheDocument();
    expect(screen.getByText("Opening hours")).toBeInTheDocument();
  });

  it("shows the subtitle when provided", () => {
    renderWithProviders(
      <EventSection title="Diner" subtitle="Every Tuesday" description="Two courses." />,
    );
    expect(screen.getByText("Every Tuesday")).toBeInTheDocument();
  });
});
