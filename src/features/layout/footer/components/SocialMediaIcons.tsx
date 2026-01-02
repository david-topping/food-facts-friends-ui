import { Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

type Props = {
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  iconColor?: string;
};

export default function SocialMediaIcons({
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  iconColor = "primary.contrastText",
}: Props) {
  return (
    <Stack direction="row" spacing={1}>
      {facebookUrl && (
        <IconButton
          component="a"
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: iconColor }}
        >
          <FacebookIcon />
        </IconButton>
      )}
      {linkedinUrl && (
        <IconButton
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: iconColor }}
        >
          <LinkedInIcon />
        </IconButton>
      )}
      {instagramUrl && (
        <IconButton
          component="a"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: iconColor }}
        >
          <InstagramIcon />
        </IconButton>
      )}
    </Stack>
  );
}
