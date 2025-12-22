import { Container, Box } from "@mui/material";

type PageProps = {
    children: React.ReactNode;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const Page = ({ children, maxWidth = "xl" }: PageProps) => {
    return (
        <Container
            component="main"
            maxWidth={maxWidth}
            sx={{ py: { xs: 3, md: 6 } }}
        >
            <Box>{children}</Box>
        </Container>
    );
};
