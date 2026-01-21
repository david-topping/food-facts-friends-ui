import { Box, Button } from "@mui/material";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useConfirmDonation } from "../../../hooks/useConfirmDonation";

export function StripePaymentForm({ amount }: { amount: number }) {
  const { confirm, loading } = useConfirmDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) await confirm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: 200,
          maxHeight: { xs: 400, sm: "none" },
          overflowY: { xs: "auto", sm: "visible" },
          overflowX: "hidden",
        }}
      >
        <PaymentElement />
      </Box>

      <Box sx={{ mt: 2, pt: 1.5, flexShrink: 0 }}>
        <Button type="submit" variant="contained" fullWidth disabled={loading} size="large">
          {loading ? "Processing…" : `Donate £${amount}`}
        </Button>
      </Box>
    </Box>
  );
}
