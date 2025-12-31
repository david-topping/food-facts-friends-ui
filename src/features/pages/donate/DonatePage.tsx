import { HeroSplit } from "../../../components/hero/HeroSplit";
import { Page } from "../../../components/layout/Page";
import donateHero from "../../../assets/images/hero/donate_hero.webp";

export const DonatePage = () => {
  return (
    <Page>
      <HeroSplit
        image={donateHero}
        imageSide="right"
        title={"How you can give to Food Facts Friends."}
        variant="light"
      ></HeroSplit>
    </Page>
  );
};
