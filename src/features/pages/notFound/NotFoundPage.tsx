import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { tokens } from "@/theme/tokens";

export const NotFoundPage = () => (
  <Page>
    <Section maxWidth="sm">
      <Stack spacing={2} sx={{ maxWidth: 440 }}>
        <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
          Page not found
        </Typography>
        <Typography variant="h1">404</Typography>
        <Typography color="text.secondary" sx={{ fontSize: "1.05rem" }}>
          Sorry, that page doesn't exist.
        </Typography>
        <Box sx={{ pt: 1 }}>
          <Button component={RouterLink} to="/" variant="contained" color="accent" size="large">
            Go back home
          </Button>
        </Box>
      </Stack>
    </Section>
  </Page>
);
