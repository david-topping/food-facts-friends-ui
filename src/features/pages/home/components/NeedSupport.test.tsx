import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { NeedSupport } from "./NeedSupport";

describe("NeedSupport", () => {
  it("renders the copy and fires the button callback", async () => {
    const onButtonClick = vi.fn();
    renderWithProviders(
      <NeedSupport
        title="Need Support?"
        description="We're here to help."
        buttonText="Find out more"
        onButtonClick={onButtonClick}
      />,
    );

    expect(screen.getByRole("heading", { name: "Need Support?" })).toBeInTheDocument();
    expect(screen.getByText("We're here to help.")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Find out more" }));
    expect(onButtonClick).toHaveBeenCalledOnce();
  });
});
