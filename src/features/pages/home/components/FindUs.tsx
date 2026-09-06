import { Suspense } from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { lazyNamed } from "@/helpers/lazyNamed";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/sectionHeading/SectionHeading";
import { CONTACT_CONTENT } from "@/content/contact.content";
import { tokens } from "@/theme/tokens";

const Map = lazyNamed(() => import("@/components/map/Map"), "Map");

type Coordinates = {
  lat: number;
  lng: number;
};

type FindUsProps = {
  title?: string;
  coordinates: Coordinates;
};

function MapFallback() {
  return <Skeleton animation="wave" variant="rectangular" width="100%" height={380} />;
}

export function FindUs({ title, coordinates }: FindUsProps) {
  return (
    <Stack spacing={4}>
      <Reveal>
        <SectionHeading eyebrow="Visit us" title={title ?? "Where you can find us"} />
      </Reveal>

      <Reveal>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
            borderRadius: `${tokens.radius.xl}px`,
            overflow: "hidden",
            border: `1px solid ${tokens.color.hairline}`,
            boxShadow: tokens.shadow.md,
          }}
        >
          <Stack
            spacing={1.25}
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: tokens.color.warmPaper,
              borderRight: { md: `1px solid ${tokens.color.hairlineWarm}` },
              borderBottom: { xs: `1px solid ${tokens.color.hairlineWarm}`, md: "none" },
            }}
          >
            <Typography variant="overline" sx={{ color: tokens.color.eyebrow }}>
              The hub
            </Typography>
            <Typography variant="h5" component="p">
              {CONTACT_CONTENT.address}
            </Typography>
          </Stack>
          <Box sx={{ minHeight: 380 }}>
            <Suspense fallback={<MapFallback />}>
              <Map center={coordinates} />
            </Suspense>
          </Box>
        </Box>
      </Reveal>
    </Stack>
  );
}
