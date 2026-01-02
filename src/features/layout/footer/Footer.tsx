import { Box, Typography } from "@mui/material";
import { GLOBAL_CONTENT } from "../../../content/global.content";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        px: 2,
        bgcolor: "primary.main",
        borderTop: 1,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="primary.contrastText">
        {GLOBAL_CONTENT.copyright(new Date().getFullYear())}
      </Typography>

      <Typography variant="body2" color="primary.contrastText" sx={{ mt: 1, opacity: 0.85 }}>
        {GLOBAL_CONTENT.charityNumber}
      </Typography>
    </Box>
  );
}
