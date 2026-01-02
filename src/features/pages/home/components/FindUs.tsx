import { Typography, Stack, Box } from "@mui/material";
import { Map } from "../../../../components/map/Map";
import Reveal from "../../../../components/animation/Reveal";

type Coordinates = {
  lat: number;
  lng: number;
};

type FindUsProps = {
  title?: string;
  coordinates: Coordinates;
};

export function FindUs({ title, coordinates }: FindUsProps) {
  return (
    <Stack spacing={4}>
      <Reveal>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
      </Reveal>

      <Reveal direction="left">
        <Box>
          <Map center={coordinates} />
        </Box>
      </Reveal>
    </Stack>
  );
}
