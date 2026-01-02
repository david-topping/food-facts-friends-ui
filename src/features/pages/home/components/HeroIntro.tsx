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
    <Box>
      {/* Mobile Layout */}
      <Stack spacing={1} sx={{ display: { xs: "block", sm: "none" } }}>
        <Reveal>
          <Typography color="text.secondary" variant="h2">
            {title}
          </Typography>
        </Reveal>

        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
          <Reveal>
            <Typography flex={1}>{subText}</Typography>
          </Reveal>

          <Reveal direction="left">
            <BrandLogo src={logo} />
          </Reveal>
        </Stack>
      </Stack>

      {/* Desktop Layout */}
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Stack spacing={2} flex={1} maxWidth={600}>
          <Reveal>
            <Typography color="text.secondary" variant="h2">
              {title}
            </Typography>
          </Reveal>

          <Reveal>
            <Typography>{subText}</Typography>
          </Reveal>
        </Stack>

        <Reveal direction="left">
          <BrandLogo src={logo} />
        </Reveal>
      </Stack>
    </Box>
  );
}
