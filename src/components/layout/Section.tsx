import { Box, Container } from "@mui/material";
import { sectionBg, sectionText, type SectionVariant } from "../../theme/sectionVariants";

type SectionProps = {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: SectionVariant;
};

export const Section = ({ children, maxWidth = "lg", variant = "default" }: SectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: sectionBg[variant],
        color: sectionText[variant],
        py: { xs: 4, md: 10 },
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};
