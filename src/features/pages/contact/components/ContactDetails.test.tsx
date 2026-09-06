import { renderWithProviders, screen } from "@/test/utils";
import { ContactDetails } from "./ContactDetails";

describe("ContactDetails", () => {
  it("shows the person and contact links", () => {
    renderWithProviders(
      <ContactDetails
        name="Mark Wells"
        role="Project Manager"
        email="hello@example.com"
        phone="01968 675417"
        address="42 John St"
      />,
    );

    expect(screen.getByRole("heading", { name: "Mark Wells" })).toBeInTheDocument();
    expect(screen.getByText("Project Manager")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "hello@example.com" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
    expect(screen.getByRole("link", { name: "01968 675417" })).toHaveAttribute(
      "href",
      "tel:01968675417",
    );
    expect(screen.getByText("42 John St")).toBeInTheDocument();
  });
});
