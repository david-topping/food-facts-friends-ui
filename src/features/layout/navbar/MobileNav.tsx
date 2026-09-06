import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Wordmark } from "./Wordmark";

type MobileNavProps = {
  onMenuOpen?: () => void;
};

export function MobileNav({ onMenuOpen }: MobileNavProps) {
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <Wordmark size="sm" />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={onMenuOpen}
        sx={{ color: "#FFFFFF" }}
      >
        <MenuIcon sx={{ fontSize: "1.9rem" }} />
      </IconButton>
    </Box>
  );
}
