import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APP_ROUTES } from "../../../routes/routes";
import NavLink from "./NavLink";

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenuOverlay({ open, onClose }: MobileMenuOverlayProps) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "primary.main",
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ color: "primary.contrastText" }}
          aria-label="Close menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Menu items */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {APP_ROUTES.filter((r) => r.showInNav).map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            label={route.label}
            onClick={onClose}
            variant="h2"
          />
        ))}
      </Box>
    </Box>
  );
}
