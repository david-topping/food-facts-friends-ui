import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";
import { TextBlock } from "@/components/textBlock/TextBlock";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
};

export function NeedSupport({ title, description, buttonText, onButtonClick }: Props) {
  return (
    <Reveal>
      <TextBlock title={title} subtitle={description} spacing={4}>
        <Button size="large" variant="contrast" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </TextBlock>
    </Reveal>
  );
}
