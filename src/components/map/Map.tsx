import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { appConfig } from "@/config/appConfig";

type MapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
};

const mapContainerStyle = { width: "100%", height: "100%" };

export const Map = ({ center, zoom = 14 }: MapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: appConfig.googleMapsApiKey,
  });

  const googleMapsUrl = `https://www.google.com/maps?q=${center.lat},${center.lng}`;

  return (
    <Box>
      <Link
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{ display: "block" }}
      >
        <Box
          sx={{
            height: 360,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loadError ? (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
              We couldn't load the map. Tap to open it in Google Maps.
            </Typography>
          ) : isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoom}
              options={{ disableDefaultUI: true }}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <CircularProgress size={28} />
          )}
        </Box>
      </Link>
    </Box>
  );
};
