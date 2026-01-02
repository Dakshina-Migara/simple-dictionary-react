import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TextBar from "../../common/component/TextBar/TextBar";
import SearchButton from "../../common/component/SearchButton/SearchButton";
import { CircularProgress } from "@mui/material";

export default function HomePage() {
    const [search, setSearch] = useState("");
    const [wordData, setWordData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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


        </Box>
    );
}
