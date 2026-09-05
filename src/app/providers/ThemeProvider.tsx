import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "@/theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        html: { height: "100%" },
        body: {
          minHeight: "100%",
          backgroundColor: "#324D3E",
        },
        "#root": { minHeight: "100%" },
      }}
    />

    {children}
  </MuiThemeProvider>
);
