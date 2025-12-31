import { Box, Container, Typography } from "@mui/material";
import { sectionBg, sectionText, type SectionVariant } from "../../theme/sectionVariants";

type HeroSplitProps = {
  image: string;
  title: string;
  variant?: SectionVariant;
  imageSide?: "left" | "right";
};

export const HeroSplit = ({
  image,
  title,
  variant = "default",
  imageSide = "left",
}: HeroSplitProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        height: { xs: "auto", md: "35dvh" },
        display: "flex",
        flexDirection: { xs: "column", md: imageSide === "left" ? "row" : "row-reverse" },
        bgcolor: sectionBg[variant],
        color: sectionText[variant],
      }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: { xs: "40vh", md: "100%" },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "20vh", md: "auto" },
          py: { xs: 4, md: 0 },
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              typography: { xs: "h2", md: "h2" },
            }}
          >
            {title}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
