import type { Components, Theme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      html: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" },
      body: { backgroundColor: tokens.color.bone },
      "h1, h2, h3, h4": { textWrap: "balance" },
      p: { textWrap: "pretty" },
      "::selection": { backgroundColor: tokens.color.accentTint, color: tokens.color.accentHover },
    },
  },

  MuiContainer: {
    defaultProps: { maxWidth: "lg" },
  },

  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        backgroundImage: "none",
        borderRadius: tokens.radius.lg,
      },
      outlined: { borderColor: tokens.color.hairline },
    },
  },

  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.xl,
        border: `1px solid ${tokens.color.hairline}`,
        boxShadow: tokens.shadow.md,
      },
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true, disableRipple: true },
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.md,
        fontWeight: 600,
        paddingInline: 20,
        transition: "background-color 160ms ease, color 160ms ease, transform 120ms ease",
        "&:active": { transform: "scale(0.98)" },
        "&.Mui-focusVisible": {
          outline: `2px solid ${tokens.color.accent}`,
          outlineOffset: 2,
        },
      },
      sizeLarge: { paddingBlock: 12, paddingInline: 24, fontSize: "0.9875rem" },
      sizeSmall: { paddingInline: 14 },
      containedPrimary: {
        "&:hover": { backgroundColor: tokens.color.forestDark },
      },
      outlined: {
        borderWidth: 1.5,
        "&:hover": { borderWidth: 1.5 },
      },
    },
  },

  MuiIconButton: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        transition: "background-color 160ms ease, color 160ms ease, transform 120ms ease",
        "&:active": { transform: "scale(0.94)" },
      },
    },
  },

  MuiLink: {
    defaultProps: { underline: "hover" },
    styleOverrides: {
      root: {
        color: tokens.color.accent,
        textUnderlineOffset: 3,
        "&:hover": { color: tokens.color.accentHover },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.paper,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: tokens.color.hairline },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: tokens.color.forestLight },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: tokens.color.forest,
          borderWidth: 1.5,
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.sm,
        fontWeight: 500,
      },
      outlined: {
        backgroundColor: tokens.color.warmPaper,
        borderColor: tokens.color.hairline,
      },
    },
  },

  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.sm,
        borderColor: tokens.color.hairline,
        textTransform: "none",
        fontWeight: 600,
        color: tokens.color.inkMuted,
        "&.Mui-selected": {
          backgroundColor: tokens.color.forest,
          color: "#FFFFFF",
          "&:hover": { backgroundColor: tokens.color.forestDark },
        },
      },
    },
  },

  MuiToggleButtonGroup: {
    styleOverrides: {
      grouped: { borderRadius: `${tokens.radius.sm}px !important` },
    },
  },

  MuiAppBar: {
    defaultProps: { elevation: 0, color: "primary" },
    styleOverrides: {
      root: { backgroundColor: tokens.color.forest, borderRadius: 0 },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: { borderRadius: tokens.radius.md, alignItems: "center" },
      standardError: { backgroundColor: "#FBEBE6", color: "#8A3A1E" },
      standardSuccess: { backgroundColor: tokens.color.greenTint, color: tokens.color.forest },
    },
  },

  MuiDivider: {
    styleOverrides: { root: { borderColor: tokens.color.hairlineWarm } },
  },
};
