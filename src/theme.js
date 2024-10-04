import { createTheme } from '@mui/material/styles'; // Updated import

export default createTheme({
    palette: {
        background: {
            default: '#F1F3F4',
        },
        primary: {
            main: "#14194C",
        },
        pink: {
            main: '#DC8295', // Use a solid color for the palette
            light: '#DC687C', // Optionally add a light variant
        }
    },
    typography: {
        fontFamily: 'Mulish, sans-serif',
        h4: {
            fontWeight: 800,
        },
        h5: {
            fontWeight: 800,
        },
        h6: {
            fontWeight: 800,
        },
        subtitle1: {
            fontWeight: 800,
        },
    },
    mixins: {
        alignInTheCenter: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }
    }
});