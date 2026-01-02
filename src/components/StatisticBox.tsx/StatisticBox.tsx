import { Card, CardContent, Typography } from "@mui/material";

type StatisticBoxProps = {
  value: string;
  label: string;
};

export default function StatisticBox({ value, label }: StatisticBoxProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        minWidth: 240,
        textAlign: "center",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.secondary" gutterBottom>
          {value}
        </Typography>

        <Typography variant="body1">{label}</Typography>
      </CardContent>
    </Card>
  );
}
