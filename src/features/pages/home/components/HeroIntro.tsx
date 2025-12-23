import { Typography, Box, Stack } from "@mui/material";
import Reveal from "../../../../components/animation/Reveal";
import BrandLogo from "../../../../components/brand/BrandLogo";

type Props = {
  title: string;
  subText: string;
  logo: string;
};

export function HomeHeroIntro({ title, subText, logo }: Props) {
  return (
    <Stack spacing={1}>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Reveal>
          <Typography variant="h2">{title}</Typography>
        </Reveal>
      </Box>

      <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
        <Stack spacing={2} flex={1} maxWidth={600}>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Reveal>
              <Typography variant="h2">{title}</Typography>
            </Reveal>
          </Box>

          <Reveal>
            <Typography>{subText}</Typography>
          </Reveal>
        </Stack>

        <Reveal direction="left">
          <BrandLogo src={logo} />
        </Reveal>
      </Stack>
    </Stack>
  );
}
