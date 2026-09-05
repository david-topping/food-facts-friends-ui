import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Reveal from "@/components/animation/Reveal";
import { Button } from "@/components/button/Button";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";

export function BuildingFundCta() {
  const navigate = useNavigate();

  return (
    <Reveal>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h2">{BUILDING_FUND_CONTENT.cta.title}</Typography>

        <Typography maxWidth="sm">{BUILDING_FUND_CONTENT.cta.description}</Typography>

        <Button size="large" variant="contrast" onClick={() => navigate(BUILDING_FUND_CONTENT.cta.route)}>
          {BUILDING_FUND_CONTENT.cta.buttonLabel}
        </Button>
      </Stack>
    </Reveal>
  );
}
