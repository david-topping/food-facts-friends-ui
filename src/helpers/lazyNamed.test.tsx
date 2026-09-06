import { Suspense } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { lazyNamed } from "./lazyNamed";

describe("lazyNamed", () => {
  it("resolves a named export as a lazy component", async () => {
    const Lazy = lazyNamed(
      () => Promise.resolve({ Widget: ({ label }: { label: string }) => <span>{label}</span> }),
      "Widget",
    );

    render(
      <Suspense fallback={<span>loading</span>}>
        <Lazy label="ready" />
      </Suspense>,
    );

    expect(screen.getByText("loading")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("ready")).toBeInTheDocument());
  });
});
