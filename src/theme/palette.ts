import type { PaletteOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

export const palette: PaletteOptions = {
  mode: "light",

  primary: {
    main: tokens.color.forest,
    dark: tokens.color.forestDark,
    light: tokens.color.forestLight,
    contrastText: tokens.color.bone,
  },

  secondary: {
    main: "#7E947B",
    light: tokens.color.greenTint,
    dark: "#63795F",
    contrastText: tokens.color.forest,
  },

  accent: {
    main: tokens.color.accent,
    dark: tokens.color.accentHover,
    light: tokens.color.accentTint,
    contrastText: "#FFFFFF",
  },

  background: {
    default: tokens.color.bone,
    paper: tokens.color.paper,
  },

  text: {
    primary: tokens.color.ink,
    secondary: tokens.color.inkMuted,
    disabled: tokens.color.inkFaint,
  },

  divider: tokens.color.hairline,

  action: {
    hover: "rgba(44, 70, 62, 0.06)",
    selected: "rgba(44, 70, 62, 0.12)",
    disabledBackground: "rgba(35, 40, 35, 0.06)",
  },
};
