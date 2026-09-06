import { Box, Chip, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { tokens } from "@/theme/tokens";

type EventTone = "paper" | "warm" | "green";

type EventSectionProps = {
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  tone?: EventTone;
  children?: ReactNode;
};

const toneBg: Record<EventTone, string> = {
  paper: tokens.color.paper,
  warm: tokens.color.warmPaper,
  green: tokens.color.greenTint,
};

export function EventSection({
  title,
  subtitle,
  description,
  badge,
  tone = "paper",
  children,
}: EventSectionProps) {
  const onGreen = tone === "green";

  return (
    <Box
      sx={{
        bgcolor: toneBg[tone],
        border: `1px solid ${onGreen ? tokens.color.greenTintBorder : tokens.color.hairline}`,
        borderRadius: `${tokens.radius.xl}px`,
        p: { xs: 3.5, md: 5 },
        boxShadow: onGreen ? "none" : tokens.shadow.md,
      }}
    >
      <Stack spacing={1.25} sx={{ maxWidth: 640 }}>
        {(subtitle || badge) && (
          <Stack direction="row" spacing={1.5} alignItems="center">
            {subtitle && (
              <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
                {subtitle}
              </Typography>
            )}
            {badge && (
              <Chip
                label={badge}
                size="small"
                sx={{
                  bgcolor: tokens.color.accentTint,
                  color: tokens.color.accentHover,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                  height: 20,
                }}
              />
            )}
          </Stack>
        )}

        <Typography
          variant="h4"
          component="h2"
          sx={{ color: onGreen ? tokens.color.forest : "text.primary" }}
        >
          {title}
        </Typography>

        <Typography sx={{ color: onGreen ? "#3B4238" : "text.secondary", lineHeight: 1.6 }}>
          {description}
        </Typography>
      </Stack>

      {children && <Box sx={{ mt: 3, maxWidth: 460 }}>{children}</Box>}
    </Box>
  );
}
