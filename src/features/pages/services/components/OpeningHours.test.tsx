import { renderWithProviders, screen } from "@/test/utils";
import { OpeningHours } from "./OpeningHours";

describe("OpeningHours", () => {
  it("lists each day and time", () => {
    renderWithProviders(
      <OpeningHours
        hours={[
          { day: "Monday", time: "10am – 3pm" },
          { day: "Sunday", time: "Closed" },
        ]}
      />,
    );

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("10am – 3pm")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });
});
