import React from "react";
import { Button } from "@mui/material";


export default function SearchButton({ onClick, disabled = false }) {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            disabled={disabled}
            sx={{
                height: 55,
                px: 3,
                backgroundColor: '#59AC77'
            }}
        >
            Search
        </Button>
    );
}
