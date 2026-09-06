import { useNavigate } from "react-router-dom";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";
import { TextBlock } from "@/components/textBlock/TextBlock";
import { trackEvent } from "@/app/analytics/ga";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";

export function BuildingFundCta() {
  const navigate = useNavigate();

  return (
    <Reveal>
      <TextBlock
        title={BUILDING_FUND_CONTENT.cta.title}
        subtitle={BUILDING_FUND_CONTENT.cta.description}
        spacing={3}
        sx={{ maxWidth: "sm", mx: "auto" }}
      >
        <Button
          size="large"
          variant="contrast"
          onClick={() => {
            trackEvent("cta_click", { location: "building_fund_cta" });
            navigate(BUILDING_FUND_CONTENT.cta.route);
          }}
        >
          {BUILDING_FUND_CONTENT.cta.buttonLabel}
        </Button>
      </TextBlock>
    </Reveal>
  );
}
