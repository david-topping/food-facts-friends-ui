import { Box, Container, Typography } from "@mui/material";
import { sectionBg, sectionText, type SectionVariant } from "../../theme/sectionVariants";

type HeroTextProps = {
  title: string;
  subtitle: string;
  variant?: SectionVariant;
};

export const HeroText = ({ title, subtitle, variant = "default" }: HeroTextProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: { xs: "30vh", md: "35dvh" },
        display: "flex",
        alignItems: "center",
        bgcolor: sectionBg[variant],
        color: sectionText[variant],
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            typography: { xs: "h2", md: "h2" },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            typography: { xs: "body1", md: "h6" },
            fontStyle: "italic",
            mx: "auto",
            mt: 2,
          }}
        >
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
};
