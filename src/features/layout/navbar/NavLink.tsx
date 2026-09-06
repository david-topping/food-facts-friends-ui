import Typography, { type TypographyProps } from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "@/theme/tokens";

type NavLinkProps = {
  to: string;
  label: string;
  onClick?: () => void;
  variant?: TypographyProps["variant"];
  active?: boolean;
};

export function NavLink({ to, label, onClick, variant = "body1", active = false }: NavLinkProps) {
  return (
    <Typography
      component={RouterLink}
      to={to}
      onClick={onClick}
      variant={variant}
      aria-current={active ? "page" : undefined}
      sx={{
        color: active ? "#FFFFFF" : tokens.color.onForest,
        fontWeight: active ? 600 : 500,
        textDecoration: "none",
        transition: "color 150ms ease",
        position: "relative",
        "&:hover": { color: "#FFFFFF" },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -6,
          height: 2,
          borderRadius: 2,
          backgroundColor: tokens.color.cream,
          opacity: active ? 1 : 0,
          transition: "opacity 150ms ease",
        },
        "&:hover::after": { opacity: active ? 1 : 0.4 },
      }}
    >
      {label}
    </Typography>
  );
}
