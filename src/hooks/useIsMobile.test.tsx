import { beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { useIsMobile } from "./useIsMobile";

function setViewport(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

beforeEach(() => {
  setViewport(false);
});

describe("useIsMobile", () => {
  it("is false on a wide viewport", () => {
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(false);
  });

  it("is true when the mobile media query matches", () => {
    setViewport(true);
    const { result } = renderHook(() => useIsMobile(), { wrapper });
    expect(result.current).toBe(true);
  });
});
