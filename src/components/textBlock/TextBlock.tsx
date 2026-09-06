import { Stack, Typography, type StackProps, type TypographyProps } from "@mui/material";
import type { ReactNode } from "react";

type TextBlockProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  titleVariant?: TypographyProps["variant"];
  subtitleVariant?: TypographyProps["variant"];
  subtitleColor?: TypographyProps["color"];
  spacing?: StackProps["spacing"];
  /** Trailing content (a button, stats, etc.) rendered below the copy. */
  children?: ReactNode;
  sx?: StackProps["sx"];
};

/** Centre-aligned heading + optional supporting line, used across the marketing pages. */
export function TextBlock({
  title,
  subtitle,
  titleVariant = "h2",
  subtitleVariant,
  subtitleColor,
  spacing = 2,
  children,
  sx,
}: TextBlockProps) {
  return (
    <Stack spacing={spacing} alignItems="center" textAlign="center" sx={sx}>
      <Typography variant={titleVariant}>{title}</Typography>

      {subtitle != null && (
        <Typography variant={subtitleVariant} color={subtitleColor}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Stack>
  );
}
