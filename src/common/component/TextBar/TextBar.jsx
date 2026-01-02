import React from "react";
import { Box, TextField } from "@mui/material";

export default function TextBar({ value, setValue }) {
  return (
    <TextField
      label="Search..."
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 55,
          backgroundColor: "#FBEFEF",
        },
      }}
    />
  );
}
