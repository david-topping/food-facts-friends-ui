import { Box, Fade } from "@mui/material";

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
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {logos.map((logo, index) => (
        <Fade in timeout={400} style={{ transitionDelay: `${index * 100}ms` }} key={logo}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Supporter logo"
              sx={{
                maxWidth: "100%",
                maxHeight: 150,
                objectFit: "contain",
                opacity: 0.85,
              }}
            />
          </Box>
        </Fade>
      ))}
    </Box>
  );
};
