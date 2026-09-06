import { Box, Container, Skeleton, Stack } from "@mui/material";

export function PageFallback() {
  return (
    <Box sx={{ flex: 1, bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 8, md: 12 } }}>
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <Skeleton animation="wave" variant="text" width={120} height={18} />
          <Skeleton animation="wave" variant="text" width="70%" height={52} />
          <Skeleton animation="wave" variant="text" width="90%" />
          <Skeleton animation="wave" variant="text" width="80%" />
        </Stack>
        <Skeleton
          animation="wave"
          variant="rounded"
          width="100%"
          height={280}
          sx={{ mt: 5, borderRadius: 4 }}
        />
      </Container>
    </Box>
  );
}
