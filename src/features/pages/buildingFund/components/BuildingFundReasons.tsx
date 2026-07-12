import { Box, Grid, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import SavingsIcon from "@mui/icons-material/Savings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import Reveal from "../../../../components/animation/Reveal";
import { BUILDING_FUND_CONTENT } from "../../../../content/buildingFund.content";

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
    <Stack spacing={5}>
      <Typography variant="h3" textAlign="center">
        {BUILDING_FUND_CONTENT.reasons.title}
      </Typography>

      <Grid container spacing={4}>
        {BUILDING_FUND_CONTENT.reasons.items.map((reason, index) => {
          const Icon = ICONS[reason.icon as ReasonIcon];

          return (
            <Grid key={reason.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal direction={index % 2 === 0 ? "right" : "left"}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: "primary.main", display: "flex", pt: 0.5 }}>
                    <Icon fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {reason.title}
                    </Typography>
                    <Typography color="text.secondary">{reason.description}</Typography>
                  </Box>
                </Stack>
              </Reveal>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
