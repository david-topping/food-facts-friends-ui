import { renderWithProviders, screen } from "@/test/utils";
import { FindUs } from "./FindUs";

describe("FindUs", () => {
  it("renders the heading and lazily mounts the map", async () => {
    renderWithProviders(
      <FindUs title="Where you can find us" coordinates={{ lat: 55.9, lng: -3.2 }} />,
    );

    expect(screen.getByRole("heading", { name: "Where you can find us" })).toBeInTheDocument();
    expect(await screen.findByTestId("google-map")).toBeInTheDocument();
  });
});
