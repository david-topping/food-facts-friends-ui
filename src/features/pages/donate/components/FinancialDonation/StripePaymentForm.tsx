import { Box, Button, Stack } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";

import { useConfirmDonation } from "../../../../../hooks/useConfirmDonation";

export function StripePaymentForm({ amount }: { amount: number }) {
  const { confirm, loading } = useConfirmDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) await confirm();
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      <Stack sx={{ height: "100%" }} spacing={3}>
        <Box sx={{ flexGrow: 1, minHeight: 340 }}>
          <PaymentElement />
        </Box>

        <Button
          sx={{ py: 1.75, fontWeight: 700, fontSize: "1rem" }}
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? "Processing…" : `Donate £${amount}`}
        </Button>
      </Stack>
    </form>
  );
}
