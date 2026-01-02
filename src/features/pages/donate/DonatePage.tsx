import { Page } from "../../../components/layout/Page";
import { HeroText } from "../../../components/hero/HeroText";
import { DONATE_CONTENT } from "../../../content/donate.content";
import { Section } from "../../../components/layout/Section";
import { DonationImpact } from "./components/DonationImpact";

export const DonatePage = () => {
  return (
    <Page>
      <HeroText title={DONATE_CONTENT.hero.title} subtitle={DONATE_CONTENT.hero.subTitle} />

      <Section maxWidth="md">
        <DonationImpact content={DONATE_CONTENT.donationImpact} />
      </Section>
    </Page>
  );
};
