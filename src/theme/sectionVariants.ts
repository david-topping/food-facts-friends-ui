export type SectionVariant = "default" | "light" | "main" | "dark";

export const sectionBg: Record<SectionVariant, string> = {
  default: "background.default",
  light: "secondary.light",
  main: "secondary.main",
  dark: "primary.main",
};

export const sectionText: Record<SectionVariant, string> = {
  default: "text.primary",
  light: "text.primary",
  main: "text.primary",
  dark: "primary.contrastText",
};
