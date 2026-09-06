import { vi } from "vitest";
import { renderWithProviders, screen } from "@/test/utils";
import { Map } from "./Map";

const { useJsApiLoader } = vi.hoisted(() => ({ useJsApiLoader: vi.fn() }));

vi.mock("@react-google-maps/api", () => ({
  useJsApiLoader,
  GoogleMap: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: () => <div data-testid="map-marker" />,
}));

const center = { lat: 55.95, lng: -3.19 };

describe("Map", () => {
  it("shows a spinner while the API loads", () => {
    useJsApiLoader.mockReturnValue({ isLoaded: false, loadError: undefined });
    renderWithProviders(<Map center={center} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the map and marker once loaded", () => {
    useJsApiLoader.mockReturnValue({ isLoaded: true, loadError: undefined });
    renderWithProviders(<Map center={center} />);
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
    expect(screen.getByTestId("map-marker")).toBeInTheDocument();
  });

  it("falls back to a message and an external link on load error", () => {
    useJsApiLoader.mockReturnValue({ isLoaded: false, loadError: new Error("boom") });
    renderWithProviders(<Map center={center} />);

    expect(screen.getByText(/couldn't load the map/i)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.google.com/maps?q=55.95,-3.19",
    );
  });
});
