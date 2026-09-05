import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { HeroText } from "@/components/hero/HeroText";
import { EventSection } from "./components/EventSection";
import { OpeningHours } from "./components/OpeningHours";
import { SERVICES_CONTENT } from "@/content/services.content";
import Reveal from "@/components/animation/Reveal";

// TODO: update this ;)
export const ServicesPage = () => {
  return (
    <Page>
      <HeroText title={SERVICES_CONTENT.hero.title} subtitle={SERVICES_CONTENT.hero.subtitle} />

      {SERVICES_CONTENT.services.map((service, index) => (
        <Section key={service.id} maxWidth="sm" variant={service.sectionVariant}>
          <Reveal direction={index % 2 === 1 ? "left" : "right"}>
            <EventSection
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
            >
              <OpeningHours hours={service.openingHours} />
            </EventSection>
          </Reveal>
        </Section>
      ))}
    </Page>
  );
};
