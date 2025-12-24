import { Box, IconButton, Slide, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APP_ROUTES } from "../../../routes/routes";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenuOverlay({ open, onClose }: MobileMenuOverlayProps) {
  const { pathname } = useLocation();

  return (
    <Modal open={open} onClose={onClose} keepMounted sx={{ zIndex: 1200 }}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "primary.main",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            p: 2.5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
            <IconButton
              onClick={onClose}
              sx={{ color: "primary.contrastText" }}
              aria-label="Close menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {APP_ROUTES.filter((r) => r.showInNav).map((route) => {
              const isActive = pathname === route.path;

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  label={route.label}
                  onClick={onClose}
                  variant="h5"
                  active={isActive}
                />
              );
            })}
          </Box>
        </Box>
      </Slide>
    </Modal>
  );
}
