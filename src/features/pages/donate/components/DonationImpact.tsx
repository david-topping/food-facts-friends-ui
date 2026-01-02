import { Typography, Stack } from "@mui/material";
import Reveal from "../../../../components/animation/Reveal";
import StatisticBox from "../../../../components/StatisticBox.tsx/StatisticBox";

type DonationImpactStat = {
  value: string;
  label: string;
};

type DonationImpactContent = {
  title: string;
  description: string;
  stats: DonationImpactStat[];
};

type DonationImpactProps = {
  content: DonationImpactContent;
};

export function DonationImpact({ content }: DonationImpactProps) {
  const { title, description, stats } = content;

  return (
    <Stack spacing={4}>
      <Reveal>
        <>
          <Typography color="text.secondary" variant="h2" align="center">
            {title}
          </Typography>

          <Typography mt={2} variant="h6" align="center">
            {description}
          </Typography>
        </>
      </Reveal>

      <Reveal direction="left">
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="center" mt={2}>
          {stats.map((stat) => (
            <StatisticBox key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </Stack>
      </Reveal>
    </Stack>
  );
}
