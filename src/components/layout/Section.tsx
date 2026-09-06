import { Box, Container } from "@mui/material";
import { sectionBg, sectionText, type SectionVariant } from "@/theme/sectionVariants";

type SectionProps = {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: SectionVariant;
  compact?: boolean;
};

export const Section = ({
  children,
  maxWidth = "lg",
  variant = "default",
  compact = false,
}: SectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: sectionBg[variant],
        color: sectionText[variant],
        pt: compact ? { xs: 5, md: 8 } : { xs: 7, md: 11 },
        pb: compact ? { xs: 6, md: 9 } : { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};
