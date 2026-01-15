import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";

type GiftAidAddress = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  townCity: string;
  county?: string;
  postcode: string;
};

type GiftAidToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;

  address: GiftAidAddress;
  onChangeAddress: (patch: Partial<GiftAidAddress>) => void;

  errors?: Partial<Record<keyof GiftAidAddress, string>>;
};

export function GiftAidToggle({
  checked,
  onChange,
  address,
  onChangeAddress,
  errors,
}: GiftAidToggleProps) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "action.hover",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
        label={
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Add Gift Aid
            </Typography>
            <Typography variant="caption" color="text.secondary">
              I am a UK taxpayer. This adds 25p for every £1 at no cost to you.
            </Typography>
          </Box>
        }
      />

      {checked && (
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Typography variant="body2" fontWeight={700}>
            Gift Aid details
          </Typography>

          <TextField
            label="Full name"
            value={address.fullName}
            onChange={(e) => onChangeAddress({ fullName: e.target.value })}
            error={!!errors?.fullName}
            helperText={errors?.fullName}
            fullWidth
          />

          <TextField
            label="Address line 1"
            value={address.addressLine1}
            onChange={(e) => onChangeAddress({ addressLine1: e.target.value })}
            error={!!errors?.addressLine1}
            helperText={errors?.addressLine1}
            fullWidth
          />

          <TextField
            label="Address line 2 (optional)"
            value={address.addressLine2 ?? ""}
            onChange={(e) => onChangeAddress({ addressLine2: e.target.value })}
            fullWidth
          />

          <TextField
            label="Town / City"
            value={address.townCity}
            onChange={(e) => onChangeAddress({ townCity: e.target.value })}
            error={!!errors?.townCity}
            helperText={errors?.townCity}
            fullWidth
          />

          <TextField
            label="County (optional)"
            value={address.county ?? ""}
            onChange={(e) => onChangeAddress({ county: e.target.value })}
            fullWidth
          />

          <TextField
            label="Postcode"
            value={address.postcode}
            onChange={(e) => onChangeAddress({ postcode: e.target.value.toUpperCase() })}
            error={!!errors?.postcode}
            helperText={errors?.postcode}
            fullWidth
          />
        </Stack>
      )}
    </Box>
  );
}
