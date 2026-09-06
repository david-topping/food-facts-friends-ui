import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import LogoGrey from "@/assets/images/brand/logo_grey.webp";

type MobileNavProps = {
  onMenuOpen?: () => void;
};

export function MobileNav({ onMenuOpen }: MobileNavProps) {
  return (
    <>
      <Box
        component={RouterLink}
        to="/"
        aria-label="Food Facts Friends home"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
        }}
      >
        <BrandLogo src={LogoGrey} size="xs" />
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={onMenuOpen}
        sx={{ fontSize: "2.5rem" }}
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}
