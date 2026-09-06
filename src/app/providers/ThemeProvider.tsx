import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "@/theme";
import { tokens } from "@/theme/tokens";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        html: { height: "100%", scrollBehavior: "smooth" },
        body: { minHeight: "100%", backgroundColor: tokens.color.bone },
        "#root": { minHeight: "100%" },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            transitionDuration: "0.01ms !important",
          },
        },
      }}
    />

    {children}
  </MuiThemeProvider>
);
