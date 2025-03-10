import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9333EA',
        },
        secondary: {
            main: '#D4E4BC'
        }
    },
    typography: {
        fontFamily: `"DM Sans Variable",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
        // h6: {
        //     fontWeight: 500,
        //     fontSize: '0.75rem'
        // },
        // h5: {
        //     fontSize: '0.875rem',
        //     fontWeight: 500
        // },
        // h4: {
        //     fontSize: '1rem',
        //     fontWeight: 600
        // },
        // h3: {
        //     fontSize: '1.25rem',
        //     fontWeight: 600
        // },
        // h2: {
        //     fontSize: '1.5rem',
        //     fontWeight: 700
        // },
        // h1: {
        //     fontSize: '2.125rem',
        //     fontWeight: 700
        // },
        // subtitle1: {
        //     fontSize: '0.875rem',
        //     fontWeight: 500,
        // },
        // subtitle2: {
        //     fontSize: '0.75rem',
        //     fontWeight: 400,
        // },
        // caption: {
        //     fontSize: '0.75rem',
        //     fontWeight: 400
        // },
        // body1: {
        //     fontSize: '0.875rem',
        //     fontWeight: 400,
        //     lineHeight: '1.334em'
        // },
        // body2: {
        //     letterSpacing: '0em',
        //     fontWeight: 400,
        //     lineHeight: '1.5em'
        // },
        button: {
            textTransform: 'capitalize'
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            }
        }
    }
})

export default theme