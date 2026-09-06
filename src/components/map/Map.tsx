import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { appConfig } from "@/config/appConfig";
import { tokens } from "@/theme/tokens";

type MapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
};

const mapContainerStyle = { width: "100%", height: "100%" };

const centreBox = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

export const Map = ({ center, zoom = 14 }: MapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: appConfig.googleMapsApiKey,
  });

  const googleMapsUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}`;

  return (
    <Link
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      aria-label="Open our location in Google Maps"
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        minHeight: 360,
        bgcolor: tokens.color.greenTint,
        cursor: "pointer",
      }}
    >
      {loadError ? (
        <Box sx={{ ...centreBox, p: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            We couldn't load the map. Tap to open it in Google Maps.
          </Typography>
        </Box>
      ) : isLoaded ? (
        <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
            options={{
              disableDefaultUI: true,
              gestureHandling: "none",
              keyboardShortcuts: false,
              clickableIcons: false,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        </Box>
      ) : (
        <Box sx={centreBox}>
          <CircularProgress size={28} />
        </Box>
      )}
    </Link>
  );
};
