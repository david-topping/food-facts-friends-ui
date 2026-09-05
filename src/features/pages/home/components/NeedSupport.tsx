import { Stack, Typography } from "@mui/material";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
};

export function NeedSupport({ title, description, buttonText, onButtonClick }: Props) {
  return (
    <Reveal>
      <Stack spacing={4} alignItems="center" textAlign="center">
        <Typography variant="h2">{title}</Typography>

        <Typography>{description}</Typography>

        <Button size="large" variant="contrast" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Stack>
    </Reveal>
  );
}
