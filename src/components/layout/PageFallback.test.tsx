import { renderWithProviders } from "@/test/utils";
import { PageFallback } from "./PageFallback";

describe("PageFallback", () => {
  it("renders skeleton placeholders while a page chunk loads", () => {
    const { container } = renderWithProviders(<PageFallback />);
    expect(container.querySelectorAll(".MuiSkeleton-root").length).toBeGreaterThan(0);
  });
});
