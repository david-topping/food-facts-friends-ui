import { Box, Grid, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/sectionHeading/SectionHeading";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { tokens } from "@/theme/tokens";

const ICONS = {
  home: HomeIcon,
  lock: LockIcon,
  savings: SavingsIcon,
  trending_up: TrendingUpIcon,
  groups: GroupsIcon,
  shield: ShieldIcon,
} as const;

type ReasonIcon = keyof typeof ICONS;

export function BuildingFundReasons() {
  return (
    <Stack spacing={{ xs: 4, md: 6 }}>
      <SectionHeading eyebrow="Why it matters" title={BUILDING_FUND_CONTENT.reasons.title} />

      <Grid container spacing={{ xs: 3.5, md: 5 }}>
        {BUILDING_FUND_CONTENT.reasons.items.map((reason, index) => {
          const Icon = ICONS[reason.icon as ReasonIcon];

          return (
            <Grid key={reason.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal delay={(index % 3) * 60}>
                <Stack spacing={1.25}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: `${tokens.radius.md}px`,
                      bgcolor: tokens.color.accentTint,
                      color: tokens.color.accentHover,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography variant="h5" component="h3">
                    {reason.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {reason.description}
                  </Typography>
                </Stack>
              </Reveal>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
