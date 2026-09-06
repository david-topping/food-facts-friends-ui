import { Box, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";

type OpeningHour = {
  day: string;
  time: string;
};

type OpeningHoursProps = {
  hours: readonly OpeningHour[];
};

export function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <Box component="dl" sx={{ m: 0, borderTop: `1px solid ${tokens.color.hairlineWarm}` }}>
      {hours.map(({ day, time }) => {
        const closed = time.trim().toLowerCase() === "closed";
        return (
          <Box
            key={day}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              py: 1.25,
              borderBottom: `1px solid ${tokens.color.hairlineWarm}`,
            }}
          >
            <Typography component="dt" sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              {day}
            </Typography>
            <Typography
              component="dd"
              sx={{
                m: 0,
                fontFamily: tokens.font.mono,
                fontSize: "0.875rem",
                fontVariantNumeric: "tabular-nums",
                color: closed ? tokens.color.inkFaint : "text.secondary",
              }}
            >
              {time}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
