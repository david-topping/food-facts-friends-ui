import { Stack, Box, Typography, Link, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type Props = {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
};

export function ContactDetails({ name, role, email, phone, address }: Props) {
  return (
    <Stack spacing={4}>
      <Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <PersonIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Stack direction="row" spacing={2} alignItems="center">
        <EmailIcon color="primary" fontSize="large" />
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Email
          </Typography>
          <Link href={`mailto:${email}`} underline="hover">
            {email}
          </Link>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <PhoneIcon color="primary" fontSize="large" />
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Phone
          </Typography>
          <Link href={`tel:${phone.replace(/\s/g, "")}`} underline="hover">
            {phone}
          </Link>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-start">
        <LocationOnIcon color="primary" fontSize="large" />
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
            Address
          </Typography>
          <Typography>{address}</Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
