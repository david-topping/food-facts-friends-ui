import { z } from "zod";
import { zodToFieldErrors } from "./zodToFieldErrors";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int("Age must be a whole number"),
  address: z.object({
    city: z.string().min(1, "City is required"),
    postcode: z.string().min(1, "Postcode is required"),
  }),
});

function errorFor(value: unknown) {
  const result = schema.safeParse(value);
  if (result.success) throw new Error("expected a validation failure");
  return result.error;
}

describe("zodToFieldErrors", () => {
  it("maps root-level issues to a { field: message } record", () => {
    const errors = zodToFieldErrors(
      errorFor({ name: "", age: 1.5, address: { city: "", postcode: "" } }),
    );

    expect(errors).toEqual({
      name: "Name is required",
      age: "Age must be a whole number",
    });
  });

  it("ignores nested issues when reading the root", () => {
    const errors = zodToFieldErrors(
      errorFor({ name: "Sam", age: 30, address: { city: "", postcode: "" } }),
    );

    expect(errors).toEqual({});
  });

  it("extracts issues under a parentPath", () => {
    const errors = zodToFieldErrors(
      errorFor({ name: "Sam", age: 30, address: { city: "", postcode: "" } }),
      ["address"],
    );

    expect(errors).toEqual({
      city: "City is required",
      postcode: "Postcode is required",
    });
  });

  it("keeps the first message when a field has several issues", () => {
    const multi = z.object({
      email: z.string().min(5, "Too short").email("Not an email"),
    });
    const result = multi.safeParse({ email: "a" });
    if (result.success) throw new Error("expected failure");

    expect(zodToFieldErrors(result.error)).toEqual({ email: "Too short" });
  });

  it("returns an empty object for an unrelated parentPath", () => {
    const errors = zodToFieldErrors(
      errorFor({ name: "", age: 1.5, address: { city: "", postcode: "" } }),
      ["missing"],
    );

    expect(errors).toEqual({});
  });
});
