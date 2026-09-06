import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";

type HeroImageProps = {
  image: string;
  minHeight?: { xs: string; md: string } | string;
  overlay?: boolean;
  children?: ReactNode;
};

export const HeroImage = ({
  image,
  minHeight = { xs: "38dvh", md: "44dvh" },
  overlay = true,
  children,
}: HeroImageProps) => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight,
        display: "flex",
        alignItems: "flex-end",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {overlay && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(34,39,35,0) 45%, rgba(34,39,35,0.5) 100%)",
          }}
        />
      )}
      {children && (
        <Container maxWidth="lg" sx={{ position: "relative", pb: { xs: 4, md: 6 } }}>
          {children}
        </Container>
      )}
    </Box>
  );
};
