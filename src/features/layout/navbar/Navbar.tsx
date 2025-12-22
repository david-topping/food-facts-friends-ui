import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

type NavbarProps = {
  isCollapsed: boolean;
  onMenuOpen?: () => void;
};

export default function Navbar({ isCollapsed, onMenuOpen }: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar>
          {!isCollapsed && <DesktopNav />}
          {isCollapsed && <MobileNav onMenuOpen={onMenuOpen} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
