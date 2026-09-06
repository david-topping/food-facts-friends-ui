import { renderWithProviders, screen, userEvent } from "@/test/utils";
import { DonationDetailsForm } from "./DonationDetailsForm";

describe("DonationDetailsForm", () => {
  it("submits a valid non-gift-aid donation", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonationDetailsForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "£10" }));
    await userEvent.type(screen.getByLabelText("Email"), "donor@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(onSubmit).toHaveBeenCalledWith({
      amount: 10,
      email: "donor@example.com",
      giftAid: false,
    });
  });

  it("shows validation errors for an empty submission", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonationDetailsForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(screen.getByText("Donation amount must be greater than 5")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears the amount error once a preset is chosen", async () => {
    renderWithProviders(<DonationDetailsForm onSubmit={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));
    expect(screen.getByText("Donation amount must be greater than 5")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "£20" }));
    expect(screen.queryByText("Donation amount must be greater than 5")).not.toBeInTheDocument();
  });

  it("requires gift aid details when gift aid is enabled", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonationDetailsForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: "£5" }));
    await userEvent.type(screen.getByLabelText("Email"), "donor@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Yes" }));
    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("First name is required")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("First name"), "Sam");
    await userEvent.type(screen.getByLabelText("Last name"), "Taylor");
    await userEvent.type(screen.getByLabelText("Address line 1"), "1 High Street");
    await userEvent.type(screen.getByLabelText("City"), "Edinburgh");
    await userEvent.type(screen.getByLabelText("Postcode"), "EH1 1AA");
    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 5,
        giftAid: true,
        giftAidDetails: expect.objectContaining({ firstName: "Sam", postcode: "EH1 1AA" }),
      }),
    );
  });

  it("accepts a typed 'other' amount", async () => {
    const onSubmit = vi.fn();
    renderWithProviders(<DonationDetailsForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByPlaceholderText("Other amount"), "37.50");
    await userEvent.type(screen.getByLabelText("Email"), "donor@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Continue to payment" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 37.5, email: "donor@example.com" }),
    );
  });

  it("prefills from initialValues", () => {
    renderWithProviders(
      <DonationDetailsForm
        onSubmit={vi.fn()}
        initialValues={{ amount: 15, email: "prefill@example.com", giftAid: false }}
      />,
    );

    expect(screen.getByLabelText("Email")).toHaveValue("prefill@example.com");
    expect(screen.getByPlaceholderText("Other amount")).toHaveValue("15");
  });
});
