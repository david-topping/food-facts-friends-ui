import { createRef } from "react";
import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { Button } from "./Button";

describe("Button", () => {
  it("renders the primary variant by default and handles clicks", async () => {
    const onClick = vi.fn();
    renderWithProviders(<Button onClick={onClick}>Donate</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Donate" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders the contrast variant", () => {
    renderWithProviders(<Button variant="contrast">Find out more</Button>);
    expect(screen.getByRole("button", { name: "Find out more" })).toBeInTheDocument();
  });

  it("forwards a ref to the underlying button", () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithProviders(<Button ref={ref}>Go</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
