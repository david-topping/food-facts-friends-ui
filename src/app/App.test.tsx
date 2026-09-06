import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { HOME_CONTENT } from "@/content/home.content";
import App from "./App";

describe("App", () => {
  it("renders the home page through the router", async () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: HOME_CONTENT.needSupport.title }),
    ).toBeInTheDocument();
  });
});
