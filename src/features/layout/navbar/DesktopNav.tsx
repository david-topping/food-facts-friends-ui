import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../../routes/routes";
import NavLink from "./NavLink";

export default function DesktopNav() {
  const { pathname } = useLocation();
  const navRoutes = APP_ROUTES.filter((route) => route.showInNav);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        gap: { xs: 3, md: 7 },
      }}
    >
      {navRoutes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          label={route.label}
          variant="h6"
          active={pathname === route.path}
        />
      ))}
    </Box>
  );
}
