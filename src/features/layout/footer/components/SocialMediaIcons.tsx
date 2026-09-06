import { Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import type { SvgIconComponent } from "@mui/icons-material";

type Props = {
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  iconColor?: string;
};

export function SocialMediaIcons({
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  iconColor = "primary.contrastText",
}: Props) {
  const links: { label: string; url?: string; Icon: SvgIconComponent }[] = [
    { label: "Facebook", url: facebookUrl, Icon: FacebookIcon },
    { label: "LinkedIn", url: linkedinUrl, Icon: LinkedInIcon },
    { label: "Instagram", url: instagramUrl, Icon: InstagramIcon },
  ];

  return (
    <Stack direction="row" spacing={1}>
      {links.map(({ label, url, Icon }) =>
        url ? (
          <IconButton
            key={label}
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            sx={{ color: iconColor }}
          >
            <Icon />
          </IconButton>
        ) : null,
      )}
    </Stack>
  );
}
