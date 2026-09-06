import { renderWithProviders, screen } from "@/test/utils";
import { CONTACT_CONTENT } from "@/content/contact.content";
import { ContactPage } from "./ContactPage";

describe("ContactPage", () => {
  it("renders the hero and contact details", () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByRole("heading", { name: CONTACT_CONTENT.hero.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: CONTACT_CONTENT.person.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTACT_CONTENT.email })).toBeInTheDocument();
  });
});
