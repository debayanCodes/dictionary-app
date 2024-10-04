import { useState, useEffect, Fragment } from 'react';
import { Stack, Typography, Box, IconButton, Divider, CircularProgress, Button, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlignCenterBox = styled(Box)(({ theme }) => ({ ...theme.mixins.alignInTheCenter }));

const Definition = ({ bookmarks, addBookmark, removeBookmark }) => {
    const { word } = useParams();
    const navigate = useNavigate();
    const [definitions, setDefinitions] = useState([]);
    const [exist, setExist] = useState(true);
    const [audio, setAudio] = useState(null);

    const isBookmarked = Object.keys(bookmarks).includes(word);

    const updateState = (data) => {
        setDefinitions(data);
        const phonetics = data[0]?.phonetics;
        if (phonetics && phonetics.length > 0) {
            const url = phonetics[0].audio.replace('//ssl', 'https://ssl');
            setAudio(new Audio(url));
        }
    };

    useEffect(() => {
        const fetchDefinition = async () => {
            try {
                const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                updateState(resp.data);
            } catch (err) {
                console.error("Error fetching definition:", err); // Improved error logging
                setExist(false);
            }
        };

        if (!isBookmarked) {
            fetchDefinition();
        } else {
            updateState(bookmarks[word]);
        }
    }, [bookmarks, isBookmarked, word]);

    if (!exist) return (
        <AlignCenterBox>
            <Typography>Word not found</Typography>
            <Button variant="contained" sx={{ textTransform: 'capitalize', mt: 2 }} onClick={() => navigate(-1)}>Go back</Button>
        </AlignCenterBox>
    );

    if (!definitions.length) return <AlignCenterBox><CircularProgress /></AlignCenterBox>;

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)}>
                    {isBookmarked ? <BookmarkIcon sx={{ color: 'black' }} /> : <BookmarkBorderIcon sx={{ color: 'black' }} />}
                </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
                mt: 3,
                background: 'linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)',
                boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
                px: 4,
                py: 5,
                color: 'white',
                borderRadius: 2,
            }}>
                <Typography sx={{ textTransform: 'capitalize' }} variant="h5">{word}</Typography>
                {audio && (
                    <IconButton onClick={() => audio.play()} sx={{
                        borderRadius: 2,
                        p: 1,
                        color: '#fff',
                        background: theme => theme.palette.pink.main,
                    }}>
                        <PlayArrowIcon />
                    </IconButton>
                )}
            </Stack>

            {definitions.map((def, idx) => (
                <Fragment key={def.word + idx}> {/* Use a unique key */}
                    <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                    {def.meanings.map((meaning) => (
                        <Box key={meaning.partOfSpeech} sx={{
                            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                            backgroundColor: '#fff',
                            p: 2,
                            borderRadius: 2,
                            mt: 3
                        }}>
                            <Typography sx={{ textTransform: 'capitalize' }} color="GrayText" variant="subtitle1">{meaning.partOfSpeech}</Typography>
                            {meaning.definitions.map((definitionItem, idx) => (
                                <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={definitionItem.definition}>
                                    {meaning.definitions.length > 1 && `${idx + 1}. `} {definitionItem.definition}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Fragment>
            ))}
        </>
    );
};

export default Definition;