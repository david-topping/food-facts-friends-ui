import { Box, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";
import { SectionHeading } from "@/components/sectionHeading/SectionHeading";
import { trackEvent } from "@/app/analytics/ga";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";

export function BuildingFundCta() {
  const navigate = useNavigate();

  return (
    <Reveal>
      <Stack spacing={3.5} sx={{ maxWidth: 620 }}>
        <SectionHeading
          title={BUILDING_FUND_CONTENT.cta.title}
          intro={BUILDING_FUND_CONTENT.cta.description}
          eyebrowColor="#4F6B57"
        />
        <Box>
          <Button
            size="large"
            variant="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => {
              trackEvent("cta_click", { location: "building_fund_cta" });
              navigate(BUILDING_FUND_CONTENT.cta.route);
            }}
          >
            {BUILDING_FUND_CONTENT.cta.buttonLabel}
          </Button>
        </Box>
      </Stack>
    </Reveal>
  );
}
