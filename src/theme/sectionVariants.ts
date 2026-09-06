import { tokens } from "./tokens";

export type SectionVariant = "default" | "paper" | "green" | "forest";

export const sectionBg: Record<SectionVariant, string> = {
  default: "background.default",
  paper: tokens.color.warmPaper,
  green: tokens.color.greenTint,
  forest: "primary.main",
};

export const sectionText: Record<SectionVariant, string> = {
  default: "text.primary",
  paper: "text.primary",
  green: tokens.color.forest,
  forest: "primary.contrastText",
};
