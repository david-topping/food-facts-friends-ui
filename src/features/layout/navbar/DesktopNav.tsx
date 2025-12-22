import Box from "@mui/material/Box";
import { APP_ROUTES } from "../../../routes/routes";
import NavLink from "./NavLink";

export default function DesktopNav() {
  const navRoutes = APP_ROUTES.filter((route) => route.showInNav);

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 6,
      }}
    >
      {navRoutes.map((route) => (
        <NavLink key={route.path} to={route.path} label={route.label} variant="h5" />
      ))}
    </Box>
  );
}
