import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { tokens } from "@/theme/tokens";

type NavbarProps = {
  isCollapsed: boolean;
  onMenuOpen?: () => void;
};

export function Navbar({ isCollapsed, onMenuOpen }: NavbarProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ borderBottom: `1px solid ${tokens.color.forestDark}` }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 76 }, display: "flex", alignItems: "center" }}>
        {isCollapsed ? <MobileNav onMenuOpen={onMenuOpen} /> : <DesktopNav />}
      </Toolbar>
    </AppBar>
  );
}
