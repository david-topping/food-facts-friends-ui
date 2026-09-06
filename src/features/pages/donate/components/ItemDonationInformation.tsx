import { Box, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { tokens } from "@/theme/tokens";

type ItemDonationInformationProps = {
  title?: string;
  description: string;
};

export function ItemDonationInformation({
  title = "Before donating",
  description,
}: ItemDonationInformationProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        maxWidth: 760,
        bgcolor: tokens.color.greenTint,
        border: `1px solid ${tokens.color.greenTintBorder}`,
        borderRadius: `${tokens.radius.lg}px`,
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      <InfoOutlinedIcon sx={{ color: tokens.color.forest, flexShrink: 0, mt: 0.25 }} />
      <Box>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontFamily: tokens.font.display,
            fontWeight: 500,
            color: tokens.color.forest,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: "#3B4238", lineHeight: 1.55 }}>{description}</Typography>
      </Box>
    </Stack>
  );
}
