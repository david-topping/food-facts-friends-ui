import { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { APP_ROUTES } from "./routes";

vi.mock("@/hooks/useCreateDonation", () => ({
  useCreateDonation: () => ({
    clientSecret: null,
    startDonation: vi.fn(),
    loading: false,
    error: null,
  }),
}));

function renderAt(path: string) {
  const router = createMemoryRouter(
    APP_ROUTES.map(({ path: routePath, element }) => ({
      path: routePath,
      element: <Suspense fallback={<span>loading</span>}>{element}</Suspense>,
    })),
    { initialEntries: [path] },
  );
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

describe("route elements", () => {
  it.each(APP_ROUTES.map((route) => route.path))(
    "mounts the lazy page for %s",
    async (path) => {
      renderAt(path);
      expect(await screen.findByRole("main", {}, { timeout: 10000 })).toBeInTheDocument();
    },
    15000,
  );
});
