import { renderWithProviders, screen } from "@/test/utils";
import { SERVICES_CONTENT } from "@/content/services.content";
import { ServicesPage } from "./ServicesPage";

describe("ServicesPage", () => {
  it("renders the hero and a section per service", () => {
    renderWithProviders(<ServicesPage />);

    expect(
      screen.getByRole("heading", { name: SERVICES_CONTENT.hero.title, level: 1 }),
    ).toBeInTheDocument();

    for (const service of SERVICES_CONTENT.services) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
  });
});
