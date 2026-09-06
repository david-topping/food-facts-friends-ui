import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { forwardRef } from "react";
import { tokens } from "@/theme/tokens";

export type ButtonVariant = "primary" | "contrast" | "outline";

export type ButtonProps = Omit<MuiButtonProps, "variant" | "color"> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", sx, ...props }, ref) => {
    if (variant === "contrast") {
      return (
        <MuiButton
          ref={ref}
          variant="contained"
          sx={{
            backgroundColor: tokens.color.bone,
            color: tokens.color.forest,
            "&:hover": { backgroundColor: "#FFFFFF" },
            ...sx,
          }}
          {...props}
        />
      );
    }

    if (variant === "outline") {
      return <MuiButton ref={ref} variant="outlined" color="primary" sx={sx} {...props} />;
    }

    return <MuiButton ref={ref} variant="contained" color="accent" sx={sx} {...props} />;
  },
);

Button.displayName = "Button";
