import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  vi.restoreAllMocks();
});

describe("appConfig — invalid environment", () => {
  it("throws when a required variable is missing", async () => {
    vi.stubEnv("VITE_STRIPE_PUBLISHABLE_KEY", "");
    vi.resetModules();

    await expect(import("./appConfig")).rejects.toThrow(/Invalid environment variables/);
  });
});
