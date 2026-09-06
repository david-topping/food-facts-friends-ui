import { useNavigate } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import homeHero from "@/assets/images/hero/home_hero.webp";
import { HOME_CONTENT } from "@/content/home.content";
import { HomeHero } from "./components/HeroIntro";
import { FindUs } from "./components/FindUs";
import { NeedSupport } from "./components/NeedSupport";
import { BuildingFundBanner } from "@/components/buildingFundBanner/BuildingFundBanner";
import { trackEvent } from "@/app/analytics/ga";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <BuildingFundBanner />

      <HomeHero
        title={HOME_CONTENT.hero.title}
        statement={HOME_CONTENT.hero.statement}
        image={homeHero}
      />

      <Section variant="green">
        <NeedSupport
          title={HOME_CONTENT.needSupport.title}
          description={HOME_CONTENT.needSupport.description}
          buttonText={HOME_CONTENT.needSupport.button.label}
          onButtonClick={() => {
            trackEvent("cta_click", { location: "home_need_support" });
            navigate(HOME_CONTENT.needSupport.button.route);
          }}
        />
      </Section>

      <Section>
        <FindUs title={HOME_CONTENT.findUs.title} coordinates={HOME_CONTENT.findUs.location} />
      </Section>
    </Page>
  );
};
