import type { PaletteOptions } from "@mui/material/styles";

export const palette: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#324D3E",
    dark: "#2B4336",
    light: "#728A6E",
    contrastText: "#ffffff",
  },

  secondary: {
    main: "#8EA48B",
    light: "#D2DED0",
    dark: "#6F8A74",
    contrastText: "#1F2F29",
  },

  background: {
    default: "#F3F7F4",
    paper: "#FFFFFF",
  },

  text: {
    primary: "#1F2F29",
    secondary: "#557f6aff",
  },

  divider: "rgba(0, 0, 0, 0.08)",

  action: {
    hover: "rgba(50, 77, 62, 0.08)",
    selected: "rgba(50, 77, 62, 0.16)",
    disabledBackground: "rgba(0,0,0,0.04)",
  },
};
