import { Box, Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/routes/routes";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

export function DesktopNav() {
  const { pathname } = useLocation();
  const navRoutes = APP_ROUTES.filter((route) => route.showInNav);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Wordmark />

      <Box sx={{ display: "flex", alignItems: "center", gap: { md: 3.5, lg: 4.5 } }}>
        {navRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            label={route.label}
            active={pathname === route.path}
          />
        ))}
        <Button
          component={RouterLink}
          to="/donate"
          variant="contained"
          color="accent"
          sx={{ borderRadius: 999, px: 2.5 }}
        >
          Donate
        </Button>
      </Box>
    </Box>
  );
}
