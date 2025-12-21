import type { Components } from "@mui/material/styles";

export const components: Components = {
    MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
        },
    },
};
