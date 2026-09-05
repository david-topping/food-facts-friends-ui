import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import homeHero from "@/assets/images/hero/home_hero.webp";
import logo from "@/assets/images/brand/logo.webp";
import { HeroImage } from "@/components/hero/HeroImage";
import { HOME_CONTENT } from "@/content/home.content";
import { HomeHeroIntro } from "./components/HeroIntro";
import { FindUs } from "./components/FindUs";
import { NeedSupport } from "./components/NeedSupport";
import { useNavigate } from "react-router-dom";
import { BuildingFundBanner } from "@/components/buildingFundBanner/BuildingFundBanner";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <BuildingFundBanner />

      <HeroImage image={homeHero} />

      <Section variant="default" maxWidth="md">
        <HomeHeroIntro
          title={HOME_CONTENT.hero.title}
          subText={HOME_CONTENT.hero.statement}
          logo={logo}
        />
      </Section>

      <Section variant="dark">
        <NeedSupport
          title={HOME_CONTENT.needSupport.title}
          description={HOME_CONTENT.needSupport.description}
          buttonText={HOME_CONTENT.needSupport.button.label}
          onButtonClick={() => navigate(HOME_CONTENT.needSupport.button.route)}
        />
      </Section>

      <Section variant="default" maxWidth="xl">
        <FindUs title={HOME_CONTENT.findUs.title} coordinates={HOME_CONTENT.findUs.location} />
      </Section>
    </Page>
  );
};
