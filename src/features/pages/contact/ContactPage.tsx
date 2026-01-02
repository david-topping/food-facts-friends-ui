// ContactPage.tsx
import { Page } from "../../../components/layout/Page";
import { HeroText } from "../../../components/hero/HeroText";
import { Paper } from "@mui/material";
import { ContactDetails } from "./components/ContactDetials";
import { Section } from "../../../components/layout/Section";
import { CONTACT_CONTENT } from "../../../content/contact.content";
import Reveal from "../../../components/animation/Reveal";

export const ContactPage = () => {
  return (
    <Page>
      <HeroText title={CONTACT_CONTENT.hero.title} subtitle={CONTACT_CONTENT.hero.subtitle} />

      <Section>
        <Reveal>
          <Paper elevation={2} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 2 }}>
            <ContactDetails
              name={CONTACT_CONTENT.person.name}
              role={CONTACT_CONTENT.person.role}
              email={CONTACT_CONTENT.email}
              phone={CONTACT_CONTENT.phone}
              address={CONTACT_CONTENT.address}
            />
          </Paper>
        </Reveal>
      </Section>
    </Page>
  );
};
