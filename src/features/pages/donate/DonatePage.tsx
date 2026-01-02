import { Page } from "../../../components/layout/Page";
import { HeroText } from "../../../components/hero/HeroText";
import { DONATE_CONTENT } from "../../../content/donate.content";

export const DonatePage = () => {
  return (
    <Page>
      <HeroText
        title={DONATE_CONTENT.hero.title}
        subtitle={DONATE_CONTENT.hero.subTitle}
        variant="dark"
      ></HeroText>
    </Page>
  );
};
