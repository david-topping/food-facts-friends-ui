import { Box, Stack, Typography } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { HeroImage } from "@/components/hero/HeroImage";
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
        <Stack spacing={2} textAlign="center" alignItems="center">
          <Typography variant="h2">{BUILDING_FUND_CONTENT.hero.title}</Typography>
          <Typography variant="h6" color="text.secondary">
            {BUILDING_FUND_CONTENT.hero.subtitle}
          </Typography>
        </Stack>
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
