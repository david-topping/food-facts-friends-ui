import { renderWithProviders, screen } from "@/test/utils";
import { HOME_CONTENT } from "@/content/home.content";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the key sections", async () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", { name: HOME_CONTENT.needSupport.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: HOME_CONTENT.findUs.title })).toBeInTheDocument();
    expect(await screen.findByTestId("google-map")).toBeInTheDocument();
  });
});
