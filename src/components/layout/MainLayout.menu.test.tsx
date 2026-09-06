import { beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { clearCookieConsent } from "@/components/cookieBanner/cookieConsent";
import { MainLayout } from "./MainLayout";

vi.mock("@/hooks/useIsMobile", () => ({ useIsMobile: () => true }));

beforeEach(() => {
  clearCookieConsent();
});

describe("MainLayout — mobile menu", () => {
  it("opens the menu overlay from the navbar button", async () => {
    const router = createMemoryRouter(
      [{ element: <MainLayout />, children: [{ index: true, element: <p>page body</p> }] }],
      { initialEntries: ["/"] },
    );
    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByText("page body")).toBeInTheDocument());
    await userEvent.click(screen.getByRole("button", { name: /menu/i }));

    expect(screen.getByRole("link", { name: "Our Supporters" })).toBeInTheDocument();
  });
});
