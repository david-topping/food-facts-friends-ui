import type { TypographyVariantsOptions } from "@mui/material";
import { tokens } from "./tokens";

const display = tokens.font.display;

export const typography: TypographyVariantsOptions = {
  fontFamily: tokens.font.body,

  h1: {
    fontFamily: display,
    fontWeight: 500,
    fontSize: "clamp(2.5rem, 1.6rem + 3vw, 3.35rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.021em",
  },
  h2: {
    fontFamily: display,
    fontWeight: 500,
    fontSize: "clamp(1.9rem, 1.3rem + 2vw, 2.4rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.016em",
  },
  h3: {
    fontFamily: display,
    fontWeight: 500,
    fontSize: "1.65rem",
    lineHeight: 1.16,
    letterSpacing: "-0.012em",
  },
  h4: {
    fontFamily: display,
    fontWeight: 500,
    fontSize: "1.4rem",
    lineHeight: 1.2,
  },
  h5: {
    fontFamily: display,
    fontWeight: 500,
    fontSize: "1.2rem",
    lineHeight: 1.25,
  },
  h6: {
    fontWeight: 600,
    fontSize: "1.05rem",
    lineHeight: 1.4,
  },
  subtitle1: { fontWeight: 600, lineHeight: 1.45 },
  subtitle2: { fontWeight: 600, lineHeight: 1.4 },
  body1: { fontSize: "1rem", lineHeight: 1.62 },
  body2: { fontSize: "0.9375rem", lineHeight: 1.55 },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
  overline: {
    fontWeight: 600,
    fontSize: "0.75rem",
    letterSpacing: "0.14em",
    lineHeight: 1.4,
    textTransform: "uppercase",
  },
  caption: { fontSize: "0.8125rem", lineHeight: 1.5 },
};
