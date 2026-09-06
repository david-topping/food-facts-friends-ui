import { Box, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { trackEvent } from "@/app/analytics/ga";
import { BUILDING_FUND_CONTENT } from "@/content/buildingFund.content";

export function BuildingFundBanner() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        py: { xs: 2, md: 3.5 },
        px: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ maxWidth: "lg", mx: "auto", textAlign: "center" }}
      >
        <Typography variant="body1" fontWeight={600}>
          {BUILDING_FUND_CONTENT.banner.message}
        </Typography>

        <Typography
          component={RouterLink}
          to={BUILDING_FUND_CONTENT.banner.route}
          onClick={() => trackEvent("cta_click", { location: "building_fund_banner" })}
          variant="body1"
          fontWeight={700}
          sx={{ color: "inherit", textDecoration: "underline" }}
        >
          {BUILDING_FUND_CONTENT.banner.linkLabel}
        </Typography>
      </Stack>
    </Box>
  );
}
