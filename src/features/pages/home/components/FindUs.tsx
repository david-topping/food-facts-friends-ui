import { Suspense } from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { lazyNamed } from "@/helpers/lazyNamed";
import { Reveal } from "@/components/animation/Reveal";

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
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      width="100%"
      height={360}
      sx={{ borderRadius: 3 }}
    />
  );
}

export function FindUs({ title, coordinates }: FindUsProps) {
  return (
    <Stack spacing={4}>
      <Reveal>
        <Typography color="text.secondary" variant="h2" align="center">
          {title}
        </Typography>
      </Reveal>

      <Reveal direction="left">
        <Box>
          <Suspense fallback={<MapFallback />}>
            <Map center={coordinates} />
          </Suspense>
        </Box>
      </Reveal>
    </Stack>
  );
}
