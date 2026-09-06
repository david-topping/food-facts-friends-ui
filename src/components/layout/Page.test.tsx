import { renderWithProviders, screen } from "@/test/utils";
import { Page } from "./Page";

describe("Page", () => {
  it("renders children inside a main landmark", () => {
    renderWithProviders(
      <Page>
        <h1>Hello</h1>
      </Page>,
    );
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { name: "Hello" }),
    );
  });
});
