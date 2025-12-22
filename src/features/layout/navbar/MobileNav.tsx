import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type MobileNavProps = {
  onMenuOpen?: () => void;
};

export default function MobileNav({ onMenuOpen }: MobileNavProps) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={onMenuOpen}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
