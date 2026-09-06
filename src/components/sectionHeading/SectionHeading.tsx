import { Stack, Typography, type StackProps, type TypographyProps } from "@mui/material";
import type { ReactNode } from "react";
import { tokens } from "@/theme/tokens";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  titleVariant?: TypographyProps["variant"];
  align?: "left" | "center";
  eyebrowColor?: string;
  maxWidth?: number | string;
  sx?: StackProps["sx"];
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  titleVariant = "h2",
  align = "left",
  eyebrowColor = tokens.color.eyebrow,
  maxWidth = 640,
  sx,
}: SectionHeadingProps) {
  return (
    <Stack
      spacing={1.25}
      sx={{
        maxWidth,
        mx: align === "center" ? "auto" : 0,
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        ...sx,
      }}
    >
      {eyebrow != null && (
        <Typography variant="overline" sx={{ color: eyebrowColor }}>
          {eyebrow}
        </Typography>
      )}
      <Typography variant={titleVariant} component="h2">
        {title}
      </Typography>
      {intro != null && (
        <Typography
          sx={{ mt: 0.5, fontSize: "1.0625rem", color: "text.secondary", lineHeight: 1.62 }}
        >
          {intro}
        </Typography>
      )}
    </Stack>
  );
}
