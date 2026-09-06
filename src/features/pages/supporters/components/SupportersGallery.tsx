import { Box } from "@mui/material";
import { tokens } from "@/theme/tokens";

type SupportersGalleryProps = {
  logos: string[];
};

export const SupportersGallery = ({ logos }: SupportersGalleryProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 1.5,
      }}
    >
      {logos.map((logo) => (
        <Box
          key={logo}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            minHeight: 128,
            borderRadius: `${tokens.radius.md}px`,
            border: `1px solid ${tokens.color.hairline}`,
            bgcolor: tokens.color.paper,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Supporter logo"
            loading="lazy"
            sx={{
              maxWidth: "100%",
              maxHeight: 72,
              objectFit: "contain",
              transition: "transform 200ms ease",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
        </Box>
      ))}
    </Box>
  );
};
