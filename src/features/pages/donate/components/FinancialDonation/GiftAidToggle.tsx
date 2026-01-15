import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";

type GiftAidToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function GiftAidToggle({ checked, onChange }: GiftAidToggleProps) {
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
            <Typography variant="caption">
              I am a UK taxpayer. This adds 25p for every £1 at no cost to you.
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
