import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type WordmarkProps = {
  onClick?: () => void;
  color?: string;
  size?: "sm" | "md";
};

export function Wordmark({ onClick, color = "#FFFFFF", size = "md" }: WordmarkProps) {
  return (
    <Box
      component={RouterLink}
      to="/"
      onClick={onClick}
      aria-label="Food Facts Friends home"
      sx={{ textDecoration: "none", display: "inline-flex" }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          color,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          fontSize: size === "sm" ? "1.15rem" : "1.35rem",
        }}
      >
        Food Facts Friends
      </Typography>
    </Box>
  );
}
