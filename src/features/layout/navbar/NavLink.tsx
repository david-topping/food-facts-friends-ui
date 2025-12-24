import Typography, { type TypographyProps } from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

type NavLinkProps = {
  to: string;
  label: string;
  onClick?: () => void;
  variant?: TypographyProps["variant"];
  active?: boolean;
};

export default function NavLink({
  to,
  label,
  onClick,
  variant = "button",
  active = false,
}: NavLinkProps) {
  return (
    <Typography
      component={RouterLink}
      to={to}
      onClick={onClick}
      variant={variant}
      sx={{
        color: "primary.contrastText",
        cursor: "pointer",
        textDecoration: "none",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </Typography>
  );
}
