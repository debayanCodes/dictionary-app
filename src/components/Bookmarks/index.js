import { Stack, IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const Bookmarks = ({ bookmarks }) => {
    return (
        <>
            <Stack sx={{ mb: 2 }} direction="row" alignItems="center">
                <IconButton to="/" component={Link} sx={{ color: 'black', mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Bookmarks</Typography>
            </Stack>
            {Object.keys(bookmarks).length > 0 ? (
                Object.keys(bookmarks).map((b) => (
                    <Link
                        key={b}
                        to={`/search/${b}`}
                        style={{
                            textDecoration: 'none', // Remove underline
                            color: 'black', // Text color
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                borderRadius: 1,
                                textTransform: 'capitalize',
                                mb: 2,
                                fontWeight: 800,
                                display: 'block',
                            }}
                        >
                            {b}
                        </Box>
                    </Link>
                ))
            ) : (
                <Typography sx={{ mt: 5 }} align="center">No Bookmarks</Typography>
            )}
        </>
    );
};

export default Bookmarks;