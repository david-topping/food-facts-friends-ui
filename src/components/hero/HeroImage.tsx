import { Box } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";

type HeroSectionProps = {
  image: string;
  height?: ResponsiveStyleValue<string | number>;
};

export const HeroImage = ({ image, height = { xs: "30vh" } }: HeroSectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        height,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    ></Box>
  );
};
