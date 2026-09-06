import { Stack, Typography, type StackProps, type TypographyProps } from "@mui/material";
import type { ReactNode } from "react";
import { tokens } from "@/theme/tokens";

type TextBlockProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  titleVariant?: TypographyProps["variant"];
  titleSx?: TypographyProps["sx"];
  subtitleVariant?: TypographyProps["variant"];
  subtitleColor?: TypographyProps["color"];
  eyebrowColor?: string;
  spacing?: StackProps["spacing"];
  children?: ReactNode;
  sx?: StackProps["sx"];
};

export function TextBlock({
  title,
  subtitle,
  eyebrow,
  titleVariant = "h2",
  titleSx,
  subtitleVariant,
  subtitleColor = "text.secondary",
  eyebrowColor = tokens.color.eyebrow,
  spacing = 2,
  children,
  sx,
}: TextBlockProps) {
  return (
    <Stack spacing={spacing} alignItems="center" textAlign="center" sx={sx}>
      {eyebrow != null && (
        <Typography variant="overline" sx={{ color: eyebrowColor }}>
          {eyebrow}
        </Typography>
      )}

      <Typography variant={titleVariant} sx={titleSx}>
        {title}
      </Typography>

      {subtitle != null && (
        <Typography variant={subtitleVariant} color={subtitleColor}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Stack>
  );
}
