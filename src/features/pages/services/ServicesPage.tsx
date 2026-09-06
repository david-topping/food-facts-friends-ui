import { Stack } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { HeroText } from "@/components/hero/HeroText";
import { EventSection } from "./components/EventSection";
import { OpeningHours } from "./components/OpeningHours";
import { SERVICES_CONTENT } from "@/content/services.content";
import { Reveal } from "@/components/animation/Reveal";

type EventTone = "paper" | "warm" | "green";

const toneFor = (id: string): EventTone => {
  if (id === "midlothian-pantry") return "green";
  if (id === "fff-diner") return "warm";
  return "paper";
};

export const ServicesPage = () => {
  return (
    <Page>
      <HeroText
        eyebrow="Our services"
        title={SERVICES_CONTENT.hero.title}
        subtitle={SERVICES_CONTENT.hero.subtitle}
      />

      <Section>
        <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 860 }}>
          {SERVICES_CONTENT.services.map((service, index) => (
            <Reveal key={service.id} delay={index * 40}>
              <EventSection
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                badge={service.subtitle?.toLowerCase().includes("coming") ? "New" : undefined}
                tone={toneFor(service.id)}
              >
                <OpeningHours hours={service.openingHours} />
              </EventSection>
            </Reveal>
          ))}
        </Stack>
      </Section>
    </Page>
  );
};
