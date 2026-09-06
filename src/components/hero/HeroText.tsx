import { Box, Container, Stack, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";

type HeroTextProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
};

export const HeroText = ({ title, subtitle, eyebrow }: HeroTextProps) => {
  return (
    <Box component="section" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 9 }, pb: { xs: 3, md: 4 } }}>
        <Stack spacing={2} sx={{ maxWidth: 660 }}>
          {eyebrow && (
            <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
              {eyebrow}
            </Typography>
          )}
          <Typography variant="h1">{title}</Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              lineHeight: 1.6,
              color: "text.secondary",
              maxWidth: "46ch",
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
