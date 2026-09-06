import { Box, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { GLOBAL_CONTENT } from "@/content/global.content";
import { APP_ROUTES } from "@/routes/routes";
import { tokens } from "@/theme/tokens";
import { SocialMediaIcons } from "./components/SocialMediaIcons";

const footerLink = {
  color: tokens.color.onForest,
  textDecoration: "none",
  fontSize: "0.9375rem",
  "&:hover": { color: "#FFFFFF" },
};

export function Footer() {
  const links = APP_ROUTES.filter((r) => r.showInNav && r.path !== "/");

  return (
    <Box
      component="footer"
      sx={{ mt: "auto", bgcolor: "primary.main", color: tokens.color.onForest }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 7 }, pb: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 6 }}
          justifyContent="space-between"
        >
          <Stack spacing={2} sx={{ maxWidth: 320 }}>
            <Typography
              variant="h5"
              component="span"
              sx={{ color: "#FFFFFF", fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              Food Facts Friends
            </Typography>
            <SocialMediaIcons
              facebookUrl={GLOBAL_CONTENT.socialMedia.facebook}
              linkedinUrl={GLOBAL_CONTENT.socialMedia.linkedin}
              instagramUrl={GLOBAL_CONTENT.socialMedia.instagram}
              iconColor={tokens.color.onForestMuted}
            />
          </Stack>

          <Stack
            component="nav"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 6 }}
          >
            <Stack spacing={1.25}>
              {links.slice(0, 3).map((route) => (
                <Box key={route.path} component={RouterLink} to={route.path} sx={footerLink}>
                  {route.label}
                </Box>
              ))}
            </Stack>
            <Stack spacing={1.25}>
              {links.slice(3).map((route) => (
                <Box key={route.path} component={RouterLink} to={route.path} sx={footerLink}>
                  {route.label}
                </Box>
              ))}
              <Box component={RouterLink} to="/building-fund" sx={footerLink}>
                Buy our building
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <Container maxWidth="lg" sx={{ py: 2.5 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0.5}
            justifyContent="space-between"
            sx={{ fontSize: "0.8125rem", color: tokens.color.onForestMuted }}
          >
            <span>{GLOBAL_CONTENT.copyright(new Date().getFullYear())}</span>
            <span>{GLOBAL_CONTENT.charityNumber}</span>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
