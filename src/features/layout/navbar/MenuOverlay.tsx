import { Box, Button, IconButton, Slide, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/routes/routes";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenuOverlay({ open, onClose }: MobileMenuOverlayProps) {
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
            p: 3,
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}
          >
            <Wordmark size="sm" onClick={onClose} />
            <IconButton onClick={onClose} aria-label="close menu" sx={{ color: "#FFFFFF" }}>
              <CloseIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>

          <Stack spacing={3.5}>
            {APP_ROUTES.filter((r) => r.showInNav).map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                label={route.label}
                onClick={onClose}
                variant="h4"
                active={pathname === route.path}
              />
            ))}
          </Stack>

          <Button
            component={RouterLink}
            to="/donate"
            onClick={onClose}
            variant="contained"
            color="accent"
            size="large"
            sx={{ mt: "auto", borderRadius: 999 }}
          >
            Donate
          </Button>
        </Box>
      </Slide>
    </Modal>
  );
}
