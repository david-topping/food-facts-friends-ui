import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

import Navbar from "../../features/layout/navbar/Navbar";
import MobileMenuOverlay from "../../features/layout/navbar/MenuOverlay";
import Footer from "../../features/layout/footer/Footer";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AnalyticsListener } from "../../app/analytics/AnalyticsListener";

export function MainLayout() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AnalyticsListener />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar isCollapsed={isMobile} onMenuOpen={() => setIsMenuOpen(true)} />

        <MobileMenuOverlay open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}
