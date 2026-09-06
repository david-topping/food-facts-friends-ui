import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "@/theme/tokens";

type HomeHeroProps = {
  title: string;
  statement: string;
  image: string;
};

export function HomeHero({ title, statement, image }: HomeHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.default",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        minHeight: { md: "clamp(440px, 54dvh, 580px)" },
      }}
    >
      <Box
        sx={{
          order: { xs: 2, md: 1 },
          display: "flex",
          alignItems: "center",
          px: { xs: 3, sm: 5, md: 6 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Stack spacing={2.75} sx={{ maxWidth: 520, ml: { md: "auto" }, mr: { md: 4 } }}>
          <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
            Community food hub &middot; Midlothian
          </Typography>
          <Typography variant="h1">{title}</Typography>
          <Typography
            sx={{ fontSize: "1.15rem", lineHeight: 1.6, color: "text.secondary", maxWidth: "42ch" }}
          >
            {statement}
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ pt: 0.5, flexWrap: "wrap", gap: 1.5 }}>
            <Button
              component={RouterLink}
              to="/donate"
              variant="contained"
              color="accent"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              How to donate
            </Button>
            <Button
              component={RouterLink}
              to="/services"
              variant="outlined"
              color="primary"
              size="large"
            >
              What we offer
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        aria-hidden
        sx={{
          order: { xs: 1, md: 2 },
          minHeight: { xs: 260, md: "100%" },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
