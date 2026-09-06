import { renderWithProviders, screen } from "@/test/utils";
import { DONATION_SUCCESS_CONTENT } from "@/content/donate.content";
import { DonationSuccessPage } from "./DonationSuccessPage";

describe("DonationSuccessPage", () => {
  it.each([
    ["succeeded", DONATION_SUCCESS_CONTENT.succeeded.title],
    ["failed", DONATION_SUCCESS_CONTENT.failed.title],
    ["canceled", DONATION_SUCCESS_CONTENT.canceled.title],
  ])("shows the %s message from the redirect_status query", (status, title) => {
    renderWithProviders(<DonationSuccessPage />, {
      initialEntries: [`/donate/success?redirect_status=${status}`],
    });
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  it("falls back to the unknown state when no status is given", () => {
    renderWithProviders(<DonationSuccessPage />, { initialEntries: ["/donate/success"] });
    expect(
      screen.getByRole("heading", { name: DONATION_SUCCESS_CONTENT.unknown.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: DONATION_SUCCESS_CONTENT.unknown.primaryAction.label }),
    ).toHaveAttribute("href", DONATION_SUCCESS_CONTENT.unknown.primaryAction.to);
  });
});
