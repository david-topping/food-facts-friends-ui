import { Box, Container, Skeleton, Stack } from "@mui/material";

export function PageFallback() {
  return (
    <Box sx={{ flex: 1, bgcolor: "background.default" }}>
      <Box
        sx={{
          minHeight: { xs: "22vh", md: "25vh" },
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          px: 2,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ bgcolor: "rgba(255,255,255,0.16)", width: { xs: "70%", sm: 340 }, height: 40 }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ bgcolor: "rgba(255,255,255,0.1)", width: { xs: "85%", sm: 460 }, height: 18 }}
        />
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Stack spacing={2} alignItems="center">
          <Skeleton animation="wave" variant="text" width="45%" height={40} />
          <Skeleton animation="wave" variant="text" width="82%" />
          <Skeleton animation="wave" variant="text" width="74%" />
          <Skeleton animation="wave" variant="rounded" width="100%" height={220} sx={{ mt: 3 }} />
        </Stack>
      </Container>
    </Box>
  );
}
