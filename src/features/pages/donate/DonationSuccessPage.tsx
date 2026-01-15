import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { Page } from "../../../components/layout/Page";
import { Section } from "../../../components/layout/Section";

export function DonationSuccessPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("redirect_status");

  let succeeded = status === "succeeded";
  succeeded = true;
  return (
    <Page>
      <Section>
        <Stack spacing={2.5} alignItems="center" sx={{ textAlign: "center" }}>
          {succeeded && <CheckCircleOutline color="success" sx={{ fontSize: 56 }} />}

          <Typography variant="h2">
            {succeeded ? "Thank you for your donation" : "Payment update"}
          </Typography>

          <Typography color="text.secondary">
            {succeeded
              ? "Your payment was successful. We really appreciate your support."
              : "Your payment status has been updated."}
          </Typography>
        </Stack>
      </Section>
      <Section maxWidth="sm">
        <Button component={Link} to="/" variant="contained" size="large" fullWidth>
          Back to home
        </Button>
      </Section>
    </Page>
  );
}
