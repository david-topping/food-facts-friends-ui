import { Card } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { HeroText } from "@/components/hero/HeroText";
import { ContactDetails } from "./components/ContactDetails";
import { Section } from "@/components/layout/Section";
import { CONTACT_CONTENT } from "@/content/contact.content";
import { Reveal } from "@/components/animation/Reveal";
import { tokens } from "@/theme/tokens";

export const ContactPage = () => {
  return (
    <Page>
      <HeroText
        eyebrow="Get in touch"
        title={CONTACT_CONTENT.hero.title}
        subtitle={CONTACT_CONTENT.hero.subtitle}
      />

      <Section>
        <Reveal>
          <Card sx={{ p: { xs: 3, sm: 5 }, maxWidth: 620, boxShadow: tokens.shadow.md }}>
            <ContactDetails
              name={CONTACT_CONTENT.person.name}
              role={CONTACT_CONTENT.person.role}
              email={CONTACT_CONTENT.email}
              phone={CONTACT_CONTENT.phone}
              address={CONTACT_CONTENT.address}
            />
          </Card>
        </Reveal>
      </Section>
    </Page>
  );
};
