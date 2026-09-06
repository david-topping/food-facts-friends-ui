import { Box } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { HeroImage } from "@/components/hero/HeroImage";
import { TextBlock } from "@/components/textBlock/TextBlock";
import buyBuildingHero from "@/assets/images/hero/buy_building_hero.webp";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { BuildingFundReasons } from "./components/BuildingFundReasons";
import { BuildingFundCta } from "./components/BuildingFundCta";

export const BuildingFundPage = () => {
  return (
    <Page>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <HeroImage image={buyBuildingHero} />
      </Box>

      <Section variant="default" maxWidth="md">
        <TextBlock
          title={BUILDING_FUND_CONTENT.hero.title}
          subtitle={BUILDING_FUND_CONTENT.hero.subtitle}
          subtitleVariant="h6"
          subtitleColor="text.secondary"
        />
      </Section>

      <Section variant="dark">
        <BuildingFundCta />
      </Section>

      <Section variant="default" maxWidth="lg">
        <BuildingFundReasons />
      </Section>
    </Page>
  );
};
