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
        light: "#BECFBB",
        dark: "#728A6E",
        contrastText: "#1f2d27",
    },

    background: {
        default: "#F3F7F4",
        paper: "#ffffff",
    },

    text: {
        primary: "#1f2f29",
        secondary: "#4f6158",
    },

    divider: "rgba(0, 0, 0, 0.08)",

    action: {
        hover: "rgba(50, 77, 62, 0.08)",
        selected: "rgba(50, 77, 62, 0.16)",
        disabledBackground: "rgba(0,0,0,0.04)",
    },
};
