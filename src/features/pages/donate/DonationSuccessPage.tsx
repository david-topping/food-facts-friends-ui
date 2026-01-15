import { CheckCircleOutline, ErrorOutline, HelpOutline } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { Page } from "../../../components/layout/Page";
import { Section } from "../../../components/layout/Section";
import { DONATION_SUCCESS_CONTENT } from "../../../content/donate.content";

type RedirectStatus = "succeeded" | "failed" | "canceled";

function getStatus(status: string | null): RedirectStatus | "unknown" {
  if (status === "succeeded" || status === "failed" || status === "canceled") return status;
  return "unknown";
}

function getIcon(status: RedirectStatus | "unknown") {
  if (status === "succeeded") return <CheckCircleOutline color="success" sx={{ fontSize: 56 }} />;
  if (status === "failed") return <ErrorOutline color="error" sx={{ fontSize: 56 }} />;
  if (status === "canceled") return <HelpOutline color="warning" sx={{ fontSize: 56 }} />;
  return <HelpOutline color="action" sx={{ fontSize: 56 }} />;
}

export function DonationSuccessPage() {
  const [searchParams] = useSearchParams();
  const status = getStatus(searchParams.get("redirect_status"));

  const ui = DONATION_SUCCESS_CONTENT[status];

  return (
    <Page>
      <Section>
        <Stack spacing={2.5} alignItems="center" sx={{ textAlign: "center" }}>
          {getIcon(status)}

          <Typography variant="h2">{ui.title}</Typography>

          <Typography color="text.secondary">{ui.message}</Typography>
        </Stack>
      </Section>

      <Section maxWidth="sm">
        <Stack spacing={1.5}>
          <Button
            component={Link}
            to={ui.primaryAction.to}
            variant="contained"
            size="large"
            fullWidth
          >
            {ui.primaryAction.label}
          </Button>

          <Button
            component={Link}
            to={ui.secondaryAction.to}
            variant="outlined"
            size="large"
            fullWidth
          >
            {ui.secondaryAction.label}
          </Button>
        </Stack>
      </Section>
    </Page>
  );
}
