import { Box, Chip, Stack, Typography } from "@mui/material";
import { SectionHeading } from "@/components/sectionHeading/SectionHeading";

type ItemDonationProps = {
  content: {
    title: string;
    note: string;
    categories: readonly {
      title: string;
      items: readonly string[];
    }[];
    beforeDonating: string;
  };
};

export function ItemDonation({ content }: ItemDonationProps) {
  return (
    <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: "100%" }}>
      <SectionHeading eyebrow="Give in person" title={content.title} intro={content.note} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          columnGap: { md: 6 },
          rowGap: 4,
        }}
      >
        {content.categories.map((category) => (
          <Stack key={category.title} spacing={1.5}>
            <Typography variant="h5" component="h3">
              {category.title}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {category.items.map((item) => (
                <Chip key={item} label={item} variant="outlined" size="small" />
              ))}
            </Box>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}
