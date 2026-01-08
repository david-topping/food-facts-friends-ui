import { Box, Typography, Stack } from "@mui/material";
import { GLOBAL_CONTENT } from "../../../content/global.content";
import SocialMediaIcons from "./components/SocialMediaIcons";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        px: 2,
        bgcolor: "primary.main",
        textAlign: "center",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <SocialMediaIcons
          facebookUrl={GLOBAL_CONTENT.socialMedia.facebook}
          linkedinUrl={GLOBAL_CONTENT.socialMedia.linkedin}
          instagramUrl={GLOBAL_CONTENT.socialMedia.instagram}
        />

        <Typography variant="body2" color="primary.contrastText">
          {GLOBAL_CONTENT.copyright(new Date().getFullYear())}
        </Typography>

        <Typography variant="body2" color="primary.contrastText" sx={{ opacity: 0.85 }}>
          {GLOBAL_CONTENT.charityNumber}
        </Typography>
      </Stack>
    </Box>
  );
}
