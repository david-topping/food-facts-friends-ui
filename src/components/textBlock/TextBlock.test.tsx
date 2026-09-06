import { renderWithProviders, screen } from "@/test/utils";
import { TextBlock } from "./TextBlock";

describe("TextBlock", () => {
  it("renders the title", () => {
    renderWithProviders(<TextBlock title="Need support?" />);
    expect(screen.getByRole("heading", { name: "Need support?" })).toBeInTheDocument();
  });

  it("renders a subtitle when provided", () => {
    renderWithProviders(<TextBlock title="Title" subtitle="Some supporting copy" />);
    expect(screen.getByText("Some supporting copy")).toBeInTheDocument();
  });

  it("omits the subtitle node when not provided", () => {
    renderWithProviders(<TextBlock title="Title" />);
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.queryByText("Some supporting copy")).not.toBeInTheDocument();
  });

  it("renders trailing children", () => {
    renderWithProviders(
      <TextBlock title="Title">
        <button type="button">Do the thing</button>
      </TextBlock>,
    );
    expect(screen.getByRole("button", { name: "Do the thing" })).toBeInTheDocument();
  });
});
