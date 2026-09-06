import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { TextBlock } from "@/components/textBlock/TextBlock";

export const NotFoundPage = () => (
  <Page>
    <Section maxWidth="sm">
      <TextBlock title="404" subtitle="Sorry, that page doesn't exist.">
        <Button component={RouterLink} to="/" variant="contained" size="large">
          Go back home
        </Button>
      </TextBlock>
    </Section>
  </Page>
);
