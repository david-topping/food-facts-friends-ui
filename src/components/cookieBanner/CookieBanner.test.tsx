import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { COOKIES_CONTENT } from "@/content/cookies.content";
import { CookieBanner } from "./CookieBanner";

const noop = () => {};

describe("CookieBanner", () => {
  it("renders nothing when closed", () => {
    const { container } = renderWithProviders(
      <CookieBanner open={false} onAcceptAll={noop} onAcceptEssential={noop} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the message and both choices when open", () => {
    renderWithProviders(<CookieBanner open onAcceptAll={noop} onAcceptEssential={noop} />);
    expect(screen.getByText(COOKIES_CONTENT.banner.message)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: COOKIES_CONTENT.banner.actions.acceptAll }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: COOKIES_CONTENT.banner.actions.acceptEssential }),
    ).toBeInTheDocument();
  });

  it("calls the matching callback for each button", async () => {
    const onAcceptAll = vi.fn();
    const onAcceptEssential = vi.fn();
    renderWithProviders(
      <CookieBanner open onAcceptAll={onAcceptAll} onAcceptEssential={onAcceptEssential} />,
    );

    await userEvent.click(
      screen.getByRole("button", { name: COOKIES_CONTENT.banner.actions.acceptEssential }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: COOKIES_CONTENT.banner.actions.acceptAll }),
    );

    expect(onAcceptEssential).toHaveBeenCalledOnce();
    expect(onAcceptAll).toHaveBeenCalledOnce();
  });
});
