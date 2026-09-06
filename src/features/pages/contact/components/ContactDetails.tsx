import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import type { ReactNode } from "react";
import { tokens } from "@/theme/tokens";

type Props = {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
};

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: `${tokens.radius.md}px`,
          bgcolor: tokens.color.greenTint,
          color: tokens.color.forest,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: tokens.color.eyebrow, display: "block", mb: 0.25 }}
        >
          {label}
        </Typography>
        {children}
      </Box>
    </Stack>
  );
}

export function ContactDetails({ name, role, email, phone, address }: Props) {
  return (
    <Stack spacing={3.5}>
      <Box>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
        <Typography color="text.secondary">{role}</Typography>
      </Box>

      <Divider />

      <Row icon={<EmailIcon fontSize="small" />} label="Email">
        <Link href={`mailto:${email}`}>{email}</Link>
      </Row>

      <Row icon={<PhoneIcon fontSize="small" />} label="Phone">
        <Link href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</Link>
      </Row>

      <Row icon={<LocationOnIcon fontSize="small" />} label="Address">
        <Typography>{address}</Typography>
      </Row>
    </Stack>
  );
}
