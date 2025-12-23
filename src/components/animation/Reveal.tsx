import { Box, Slide, type SlideProps } from "@mui/material";
import type { ReactElement } from "react";

type RevealProps = Omit<SlideProps, "in" | "timeout"> & {
  children: ReactElement;
  timeout?: number;
};

export default function Reveal({
  children,
  direction = "right",
  timeout = 600,
  ...props
}: RevealProps) {
  return (
    <Slide in timeout={timeout} direction={direction} {...props}>
      <Box>{children}</Box>
    </Slide>
  );
}
