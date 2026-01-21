import { Page } from "../../../components/layout/Page";
import { HeroText } from "../../../components/hero/HeroText";
import { DONATE_CONTENT } from "../../../content/donate.content";
import { Section } from "../../../components/layout/Section";
import Reveal from "../../../components/animation/Reveal";
import { FinancialDonationSection } from "../../donation/components/FinancialDonationSection";
import { ItemDonation } from "./components/ItemDonation";
import { ItemDonationInformation } from "./components/ItemDonationInformation";

export const DonatePage = () => {
  return (
    <Page>
      <HeroText title={DONATE_CONTENT.hero.title} subtitle={DONATE_CONTENT.hero.subTitle} />

      <Section maxWidth="sm">
        <FinancialDonationSection content={DONATE_CONTENT.financialDonation} />
      </Section>

      <Section variant="dark">
        <Reveal direction="left">
          <ItemDonation content={DONATE_CONTENT.itemDonation} />
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <ItemDonationInformation description={DONATE_CONTENT.itemDonation.beforeDonating} />
        </Reveal>
      </Section>
    </Page>
  );
};
