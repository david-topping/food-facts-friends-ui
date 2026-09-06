import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { COOKIES_CONTENT } from "@/content/cookies.content";
import { tokens } from "@/theme/tokens";

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
      role="dialog"
      aria-label={COOKIES_CONTENT.banner.title}
      sx={{
        position: "fixed",
        left: { xs: 16, sm: "auto" },
        right: 16,
        bottom: 16,
        zIndex: theme.zIndex.snackbar,
        width: { sm: 380 },
        p: 2.5,
        borderRadius: `${tokens.radius.lg}px`,
        border: `1px solid ${tokens.color.hairline}`,
        backgroundColor: tokens.color.warmPaper,
        boxShadow: tokens.shadow.lg,
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontFamily: tokens.font.display, fontWeight: 500 }}>
            {COOKIES_CONTENT.banner.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {COOKIES_CONTENT.banner.message}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary" fullWidth onClick={onAcceptAll}>
            {COOKIES_CONTENT.banner.actions.acceptAll}
          </Button>
          <Button variant="outlined" color="primary" fullWidth onClick={onAcceptEssential}>
            {COOKIES_CONTENT.banner.actions.acceptEssential}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
