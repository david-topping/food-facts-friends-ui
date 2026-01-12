import { Stack, Typography, Button } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";

export function DonationSuccessPage() {
  const [searchParams] = useSearchParams();

  const paymentIntent = searchParams.get("payment_intent");
  const status = searchParams.get("redirect_status");

  return (
    <Stack spacing={3} alignItems="center" mt={8}>
      {status === "succeeded" && <Typography>Your payment was successful.</Typography>}

      {paymentIntent && (
        <Typography variant="body2" color="text.secondary">
          Reference: {paymentIntent}
        </Typography>
      )}

      <Button component={Link} to="/" variant="contained">
        Back to home
      </Button>
    </Stack>
  );
}
