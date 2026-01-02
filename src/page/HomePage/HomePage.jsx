import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TextBar from "../../common/component/TextBar/TextBar";
import SearchButton from "../../common/component/SearchButton/SearchButton";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!search.trim()) return;
        setLoading(true);
        setError("");
        setWordData(null);

        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${search}`
            );
            if (!response.ok) throw new Error("Word not found");
            const data = await response.json();
            setWordData(data[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePlay = () => {
        if (!wordData?.phonetics?.length) return;
        const audioUrl = wordData.phonetics.find(p => p.audio)?.audio;
        if (!audioUrl) return;
        const audio = new Audio(audioUrl);
        audio.play();
    };


    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                px: { xs: 2, sm: 4 },
                gap: { xs: 2, sm: 3 }
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#4a995f", mb: { xs: 3, sm: 5 }, textAlign: "center" }}
            >
                Free Dictionary
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                    maxWidth: 500,
                    gap: 1
                }}
            >
                <TextBar
                    value={search}
                    setValue={setSearch}
                    onEnter={() => { }}
                    sx={{ flex: 1 }}
                />
                <SearchButton
                    onClick={() => { }}
                    sx={{
                        backgroundColor: "#59AC77",
                        "&:hover": { backgroundColor: "#4a995f" },
                        height: 55,
                        px: 3,
                        mt: { xs: 1, sm: 0 }
                    }}
                />
            </Box>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {wordData && (
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        width: "100%",
                        maxWidth: 500,
                        bgcolor: "#f9f9f9",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: "10px"
                        }}
                    >
                        <Typography variant="h5">{wordData.word}</Typography>
                        {wordData.phonetics.some(p => p.audio) && (
                            <Button
                                onClick={handlePlay}
                                startIcon={<PlayArrowIcon />}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#59AC77",
                                    border: "1px solid #59AC77",
                                    textTransform: "none"
                                }}
                            >
                                Play
                            </Button>
                        )}
                    </Box>

                    {wordData.meanings.map((meaning, index) => (
                        <Box
                            key={index}
                            sx={{
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                bgcolor: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ color: "#4a995f" }}
                            >
                                {meaning.partOfSpeech}
                            </Typography>
                            {meaning.definitions.map((def, i) => (
                                <Typography
                                    key={`${index}-${i}`}
                                    variant="body2"
                                    sx={{ mb: 0.5 }}
                                >
                                    • {def.definition}
                                    {def.example && ` (e.g. "${def.example}")`}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}