import { APP_ROUTES } from "./routes";

describe("APP_ROUTES", () => {
  it("defines a home route and a donate route", () => {
    const paths = APP_ROUTES.map((route) => route.path);
    expect(paths).toContain("/");
    expect(paths).toContain("/donate");
  });

  it("every route has a path, label and element", () => {
    for (const route of APP_ROUTES) {
      expect(route.path).toMatch(/^\//);
      expect(route.label.length).toBeGreaterThan(0);
      expect(route.element).toBeTruthy();
    }
  });

  it("only exposes some routes in the nav", () => {
    const navPaths = APP_ROUTES.filter((r) => r.showInNav).map((r) => r.path);
    expect(navPaths).toContain("/");
    expect(navPaths).not.toContain("/donate/success");
  });
});
