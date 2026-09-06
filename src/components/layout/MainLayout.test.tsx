import { beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { clearCookieConsent, setCookieConsent } from "@/components/cookieBanner/cookieConsent";
import { COOKIES_CONTENT } from "@/content/cookies.content";
import { GLOBAL_CONTENT } from "@/content/global.content";
import { MainLayout } from "./MainLayout";

function renderLayout() {
  const router = createMemoryRouter(
    [{ element: <MainLayout />, children: [{ index: true, element: <p>page body</p> }] }],
    { initialEntries: ["/"] },
  );
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  clearCookieConsent();
});

describe("MainLayout", () => {
  it("renders the navbar, footer and routed page", async () => {
    renderLayout();

    await waitFor(() => expect(screen.getByText("page body")).toBeInTheDocument());
    expect(screen.getByText(GLOBAL_CONTENT.charityNumber)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
  });

  it("shows the cookie banner until a choice is stored", async () => {
    renderLayout();
    await waitFor(() =>
      expect(screen.getByText(COOKIES_CONTENT.banner.message)).toBeInTheDocument(),
    );
  });

  it("hides the cookie banner once consent exists", async () => {
    setCookieConsent("essential");
    renderLayout();

    await waitFor(() => expect(screen.getByText("page body")).toBeInTheDocument());
    expect(screen.queryByText(COOKIES_CONTENT.banner.message)).not.toBeInTheDocument();
  });
});
