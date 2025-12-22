import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useState } from "react";

import Navbar from "../../features/layout/navbar/Navbar";
import MobileMenuOverlay from "../../features/layout//navbar/MenuOverlay";
import { useIsMobile } from "../../hooks/useIsMobile";

export function MainLayout() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar isCollapsed={isMobile} onMenuOpen={() => setIsMenuOpen(true)} />

      <MobileMenuOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Box component="main" flexGrow={1}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
