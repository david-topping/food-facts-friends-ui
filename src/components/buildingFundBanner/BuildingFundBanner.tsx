import { Box, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";
import { trackEvent } from "@/app/analytics/ga";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";
import { tokens } from "@/theme/tokens";

export function BuildingFundBanner() {
  return (
    <Box sx={{ bgcolor: tokens.color.forestBanner, color: tokens.color.onForest }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 0.75, sm: 1.5 }}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ py: { xs: 1.25, sm: 1 }, textAlign: "center" }}
        >
          <Typography variant="body2">{BUILDING_FUND_CONTENT.banner.message}</Typography>
          <Box
            component={RouterLink}
            to={BUILDING_FUND_CONTENT.banner.route}
            onClick={() => trackEvent("cta_click", { location: "building_fund_banner" })}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              color: tokens.color.cream,
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              "&:hover": { color: "#F3D6B8" },
            }}
          >
            {BUILDING_FUND_CONTENT.banner.linkLabel}
            <ArrowForwardIcon sx={{ fontSize: "0.95rem" }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
