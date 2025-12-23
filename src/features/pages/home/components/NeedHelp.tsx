import { Stack, Typography } from "@mui/material";
import Reveal from "../../../../components/animation/Reveal";

type Props = {
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
};

export function NeedHelp({ title, description }: Props) {
  return (
    <Stack spacing={3} alignItems="center" textAlign="center">
      <Reveal>
        <Typography variant="h2">{title}</Typography>
      </Reveal>

      <Reveal>
        <Typography>{description}</Typography>
      </Reveal>
    </Stack>
  );
}
