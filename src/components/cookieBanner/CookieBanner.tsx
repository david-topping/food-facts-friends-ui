import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { COOKIES_CONTENT } from "../../content/cookies.content";
import { getCookieConsent, setCookieConsent } from "./cookieConsent";

type CookieBannerProps = {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
};

export function CookieBanner({ open, onAccept, onReject }: CookieBannerProps) {
  const theme = useTheme();

  if (!open) return null;

  const existing = getCookieConsent();
  if (existing) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: theme.zIndex.snackbar,
        maxWidth: 520,
        mx: "auto",
        minHeight: 120,
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
      }}
    >
      <Stack direction="column" spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {COOKIES_CONTENT.banner.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {COOKIES_CONTENT.banner.message}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => {
              setCookieConsent("rejected");
              onReject();
            }}
          >
            {COOKIES_CONTENT.banner.actions.reject}
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setCookieConsent("accepted");
              onAccept();
            }}
          >
            {COOKIES_CONTENT.banner.actions.accept}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
