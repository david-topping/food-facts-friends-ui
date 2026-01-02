import { HeroText } from "../../../components/hero/HeroText";
import { Page } from "../../../components/layout/Page";
import { Section } from "../../../components/layout/Section";
import { SUPPORTERS_CONTENT } from "../../../content/supporters.content";
import { SupportersGallery } from "./components/SupportersGallery";

const supporterLogos = Object.values(
  import.meta.glob("../../../assets/images/supporters/*.png", {
    eager: true,
    import: "default",
  }),
) as string[];

export const SupportersPage = () => {
  return (
    <Page>
      <HeroText title={SUPPORTERS_CONTENT.hero.title} subtitle={SUPPORTERS_CONTENT.hero.subTitle} />

      <Section>
        <SupportersGallery logos={supporterLogos} />
      </Section>
    </Page>
  );
};
