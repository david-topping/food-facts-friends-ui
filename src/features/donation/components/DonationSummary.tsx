import { Box, Divider, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { tokens } from "@/theme/tokens";

const GIFT_AID_RATE = 0.25;

function formatGbp(value: number) {
  return value.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  });
}

type DonationSummaryProps = {
  amount: number | null;
  giftAid: boolean;
};

export function DonationSummary({ amount, giftAid }: DonationSummaryProps) {
  const hasAmount = amount != null && Number.isFinite(amount) && amount > 0;
  const giftAidValue = hasAmount && giftAid ? amount * GIFT_AID_RATE : 0;
  const total = hasAmount ? amount + giftAidValue : 0;

  return (
    <Box
      sx={{
        bgcolor: tokens.color.greenTint,
        border: `1px solid ${tokens.color.greenTintBorder}`,
        borderRadius: `${tokens.radius.lg}px`,
        p: 3,
        position: { md: "sticky" },
        top: { md: 24 },
      }}
    >
      <Typography variant="overline" sx={{ color: "#4F6B57" }}>
        Your gift
      </Typography>

      {hasAmount ? (
        <Stack spacing={1.5} sx={{ mt: 1.5 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Donation</Typography>
            <Typography sx={{ fontWeight: 600 }}>{formatGbp(amount)}</Typography>
          </Stack>

          {giftAid && (
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Gift Aid (+25%)</Typography>
              <Typography sx={{ fontWeight: 600, color: tokens.color.forest }}>
                + {formatGbp(giftAidValue)}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ borderColor: tokens.color.greenTintBorder }} />

          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography sx={{ fontWeight: 600 }}>Total gift</Typography>
            <Typography variant="h5" component="span" sx={{ color: tokens.color.forest }}>
              {formatGbp(total)}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={1.25} sx={{ mt: 1.5 }} alignItems="flex-start">
          <FavoriteBorderIcon sx={{ color: tokens.color.forest }} />
          <Typography color="text.secondary">
            Pick an amount to see what your gift is worth.
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
