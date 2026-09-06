import { Stack, Typography } from "@mui/material";
import { Page } from "@/components/layout/Page";
import { Section } from "@/components/layout/Section";
import { HeroImage } from "@/components/hero/HeroImage";
import buyBuildingHero from "@/assets/images/hero/buy_building_hero.webp";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { tokens } from "@/theme/tokens";
import { BuildingFundReasons } from "./components/BuildingFundReasons";
import { BuildingFundCta } from "./components/BuildingFundCta";

export const BuildingFundPage = () => {
  return (
    <Page>
      <HeroImage image={buyBuildingHero}>
        <Stack spacing={1.5} sx={{ maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: tokens.color.cream }}>
            The building fund
          </Typography>
          <Typography variant="h1" sx={{ color: "#FFFFFF" }}>
            {BUILDING_FUND_CONTENT.hero.title}
          </Typography>
        </Stack>
      </HeroImage>

      <Section compact>
        <Typography
          sx={{ maxWidth: 640, fontSize: { xs: "1.1rem", md: "1.25rem" }, color: "text.secondary" }}
        >
          {BUILDING_FUND_CONTENT.hero.subtitle}
        </Typography>
      </Section>

      <Section variant="green">
        <BuildingFundCta />
      </Section>

      <Section>
        <BuildingFundReasons />
      </Section>
    </Page>
  );
};
