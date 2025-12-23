import { Page } from "../../../components/layout/Page";
import { Section } from "../../../components/layout/Section";
import homeHero from "../../../assets/images/hero/home_hero.webp";
import logo from "../../../assets/images/brand/logo.webp";
import { HeroImage } from "../../../components/hero/HeroImage";
import { HOME_CONTENT } from "../../../content/home.content";
import { HomeHeroIntro } from "./components/HeroIntro";
import { FindUs } from "./components/FindUs";
import { NeedHelp } from "./components/NeedHelp";
export const HomePage = () => {
  return (
    <Page>
      <HeroImage image={homeHero} />

      <Section variant="default" maxWidth="md">
        <HomeHeroIntro title={HOME_CONTENT.title} subText={HOME_CONTENT.statement} logo={logo} />
      </Section>

      <Section variant="dark">
        <NeedHelp
          title={HOME_CONTENT.needHelp}
          description={HOME_CONTENT.needHelpStatement}
        ></NeedHelp>
      </Section>

      <Section variant="default" maxWidth="xl">
        <FindUs title={HOME_CONTENT.findUs} coordinates={HOME_CONTENT.coordinates} />
      </Section>
    </Page>
  );
};
