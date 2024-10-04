import { useState } from 'react';
import { Box, Typography, FilledInput, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const [word, setWord] = useState("");
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedWord = word.trim().toLowerCase();
        if (!trimmedWord || trimmedWord.split(' ').length > 1) return;
        navigate(`/search/${trimmedWord}`); // Use navigate for routing
    };

    return (
        <Box sx={{ ...theme.mixins.alignInTheCenter }}>
            <img src="/assets/book.png" alt="Book" />
            <Typography
                color="primary"
                sx={{
                    mt: 3,
                    mb: 1
                }} 
                variant="h4"
            >
                Dictionary
            </Typography>
            <Typography color="text.secondary"> {/* Changed to text.secondary for better theming */}
                Find meanings and save for quick reference
            </Typography>
            <Box sx={{ width: '360px' }}>
                <form onSubmit={handleSubmit}>
                    <FilledInput
                        value={word}
                        onChange={event => setWord(event.target.value)}
                        disableUnderline 
                        placeholder="Search word"
                        sx={{
                            my: 4,
                            backgroundColor: 'white',
                            borderRadius: 2,
                            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                            '& .MuiFilledInput-input': {
                                p: 2,
                            }
                        }}
                        startAdornment={<SearchIcon color="disabled" />}
                        fullWidth
                    />
                </form>
            </Box>
            <IconButton 
                to="/bookmarks" 
                component={Link} 
                sx={{
                    borderRadius: 2,
                    p: 2,
                    color: '#fff',
                    background: theme.palette.pink.main, // Ensure palette color is accessed correctly
                    boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
                }}
            >
                <BookmarkIcon />
            </IconButton>
        </Box>
    );
};

export default Home;