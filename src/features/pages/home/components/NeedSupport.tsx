import { Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";
import { SectionHeading } from "@/components/sectionHeading/SectionHeading";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
};

export function NeedSupport({ title, description, buttonText, onButtonClick }: Props) {
  return (
    <Reveal>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 6 }}
        alignItems={{ md: "center" }}
        justifyContent="space-between"
      >
        <SectionHeading
          eyebrow="If you need support"
          title={title}
          intro={description}
          eyebrowColor="#4F6B57"
        />
        <Button
          size="large"
          variant="contrast"
          onClick={onButtonClick}
          endIcon={<ArrowForwardIcon />}
          sx={{ flexShrink: 0 }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Reveal>
  );
}
