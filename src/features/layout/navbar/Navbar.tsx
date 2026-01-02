import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

type NavbarProps = {
  isCollapsed: boolean;
  onMenuOpen?: () => void;
};

export default function Navbar({ isCollapsed, onMenuOpen }: NavbarProps) {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          minHeight: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        {!isCollapsed && <DesktopNav />}
        {isCollapsed && <MobileNav onMenuOpen={onMenuOpen} />}
      </Toolbar>
    </AppBar>
  );
}
