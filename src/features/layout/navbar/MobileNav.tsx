import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BrandLogo from "../../../components/brand/BrandLogo";
import LogoGrey from "../../../assets/images/brand/logo_grey.webp";
import { useNavigate } from "react-router-dom";

type MobileNavProps = {
  onMenuOpen?: () => void;
};
export default function MobileNav({ onMenuOpen }: MobileNavProps) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
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
