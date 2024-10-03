import { Stack, IconButton, Typography, Box } from '@mui/material'; // Updated import
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Updated import
import { Link } from 'react-router-dom';

const Bookmarks = ({ bookmarks }) => {
    return (
        <>
            <Stack sx={{ mb: 2 }} direction="row" alignItems="center">
                <IconButton to="/" component={Link} sx={{ color: 'black', mr: 1 }}>
                    <ArrowBackIcon /> {/* Updated icon */}
                </IconButton>
                <Typography variant="h6">Bookmarks</Typography>
            </Stack>
            {
                !!Object.keys(bookmarks).length ? (
                    Object.keys(bookmarks).map(b => (
                        <Box
                            key={b}
                            to={`/search/${b}`}
                            component={Link}
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                borderRadius: 1,
                                textTransform: 'capitalize',
                                mb: 2,
                                fontWeight: 800,
                                display: 'block',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            {b}
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ mt: 5 }} align="center">No Bookmarks</Typography>
                )
            }
        </>
    );
}

export default Bookmarks;
