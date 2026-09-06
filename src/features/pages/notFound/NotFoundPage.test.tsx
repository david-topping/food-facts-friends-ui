import { renderWithProviders, screen } from "@/test/utils";
import { NotFoundPage } from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("shows a 404 message inside a main landmark with a link home", () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
  });
});
