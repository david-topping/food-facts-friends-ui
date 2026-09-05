import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { COOKIES_CONTENT } from "@/content/cookies.content";

type CookieBannerProps = {
  open: boolean;
  onAcceptAll: () => void;
  onAcceptEssential: () => void;
};

export function CookieBanner({ open, onAcceptAll, onAcceptEssential }: CookieBannerProps) {
  const theme = useTheme();

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: theme.zIndex.snackbar,
        maxWidth: 640,
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
          <Button variant="outlined" onClick={onAcceptEssential}>
            {COOKIES_CONTENT.banner.actions.acceptEssential}
          </Button>

          <Button variant="contained" onClick={onAcceptAll}>
            {COOKIES_CONTENT.banner.actions.acceptAll}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
