import { Box, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { PRESETS } from "./donationDetials.validation";

type DonationAmountPickerProps = {
  amount: number;
  customAmount: string;
  amountError?: string;
  onSelectPreset: (amount: number) => void;
  onChangeCustomAmount: (value: string) => void;
  onBlurAmount: () => void;
};

export function DonationAmountPicker(props: DonationAmountPickerProps) {
  const { amount, customAmount, amountError, onSelectPreset, onChangeCustomAmount, onBlurAmount } =
    props;

  const selectedPreset = PRESETS.includes(amount as (typeof PRESETS)[number]) ? amount : null;

  return (
    <Box>
      <ToggleButtonGroup
        value={selectedPreset}
        exclusive
        onChange={(_, value) => value && onSelectPreset(value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {PRESETS.map((preset) => (
          <ToggleButton key={preset} value={preset}>
            £{preset}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TextField
        value={customAmount}
        onChange={(e) => onChangeCustomAmount(e.target.value)}
        onBlur={onBlurAmount}
        placeholder="Other amount"
        fullWidth
        error={!!amountError}
        helperText={amountError}
        inputMode="decimal"
      />
    </Box>
  );
}
