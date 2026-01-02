import { Box } from "@mui/material";

type BrandLogoProps = {
  src: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

const sizeMap = {
  xs: { xs: 70, md: 140 },
  sm: { xs: 120, md: 140 },
  md: { xs: 140, md: 180 },
  lg: { xs: 180, md: 220 },
};

export default function BrandLogo({ src, alt = "Brand logo", size = "md" }: BrandLogoProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: sizeMap[size],
        height: "auto",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}
