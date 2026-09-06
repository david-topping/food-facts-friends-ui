import { TextBlock } from "@/components/textBlock/TextBlock";

type ItemDonationInformationProps = {
  title?: string;
  description: string;
};

export function ItemDonationInformation({
  title = "Before donating",
  description,
}: ItemDonationInformationProps) {
  return (
    <TextBlock
      title={title}
      titleVariant="h4"
      titleSx={{ fontWeight: 600 }}
      subtitle={description}
      subtitleColor="text.secondary"
      sx={{ mx: "auto" }}
    />
  );
}
