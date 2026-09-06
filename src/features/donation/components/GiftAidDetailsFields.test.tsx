import { renderWithProviders, screen, userEvent } from "@/test/utils";
import type { GiftAidDetailsValues } from "./donation.types";
import { GiftAidDetailsFields } from "./GiftAidDetailsFields";

const values: GiftAidDetailsValues = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  country: "United Kingdom",
};

describe("GiftAidDetailsFields", () => {
  it("emits the updated values on change", async () => {
    const onChange = vi.fn();
    renderWithProviders(<GiftAidDetailsFields values={values} onChange={onChange} />);

    await userEvent.type(screen.getByLabelText("First name"), "S");
    expect(onChange).toHaveBeenLastCalledWith({ ...values, firstName: "S" });
  });

  it("updates the optional address line 2", async () => {
    const onChange = vi.fn();
    renderWithProviders(<GiftAidDetailsFields values={values} onChange={onChange} />);

    await userEvent.type(screen.getByLabelText(/address line 2/i), "F");
    expect(onChange).toHaveBeenLastCalledWith({ ...values, addressLine2: "F" });
  });

  it("only shows errors once touched", () => {
    const { rerender } = renderWithProviders(
      <GiftAidDetailsFields
        values={values}
        onChange={vi.fn()}
        errors={{ firstName: "First name is required" }}
        touched={false}
      />,
    );
    expect(screen.queryByText("First name is required")).not.toBeInTheDocument();

    rerender(
      <GiftAidDetailsFields
        values={values}
        onChange={vi.fn()}
        errors={{ firstName: "First name is required" }}
        touched
      />,
    );
    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });
});
