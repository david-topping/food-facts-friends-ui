import { Typography, Button, Stack } from "@mui/material";
import { Page } from "../../../components/layout/Page";

export const HomePage = () => {
  return (
    <Page>
      <Stack spacing={3}>
        <Typography variant="h1">Food Facts Friends</Typography>

        <Typography color="text.secondary">Food Facts Friends</Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained">Get Started</Button>
          <Button variant="outlined">Learn More</Button>
        </Stack>
      </Stack>
    </Page>
  );
};
