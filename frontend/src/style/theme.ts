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
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    color: 'black',
                    boxShadow: 'none',
                    backdropFilter: "blur(20px)",
                    borderBottom: '1px solid #ccc'
                }
            }
        }
    }
})

export default theme