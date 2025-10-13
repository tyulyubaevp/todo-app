import { Box, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import { Stack } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useState, useRef } from "react";

const CleanTextField = styled(TextField)`
  & .MuiInputBase-root {
    background-color: transparent;
    box-shadow: none;
  }

  & .MuiFilledInput-root::before,
  & .MuiFilledInput-root::after {
    border-bottom: none;
  }

  & .MuiInputBase-root:hover,
  & .MuiInputBase-root.Mui-focused {
    background-color: transparent;
  }

  & .MuiFilledInput-root:hover::before,
  & .MuiFilledInput-root:hover::after,
  & .MuiFilledInput-root.Mui-focused::before,
  & .MuiFilledInput-root.Mui-focused::after {
    border-bottom: none !important;
  }
`;

const AddTodo = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        background: (theme) => theme.palette.background.paper,
        overflow: "clip",
      }}
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Stack direction={"row"} spacing={0} alignItems={"center"}>
        <CleanTextField
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              color: (theme) => theme.palette.text.primary,
            },
            "& .MuiInputLabel-root": {
              color: (theme) => theme.palette.text.secondary,
            },
          }}
          variant="filled"
          label="Добавить задачу"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
        <IconButton
          aria-label="add"
          type="submit"
          sx={{ padding: "14px", color: (theme) => theme.palette.primary.main }}
        >
          <AddCircleRoundedIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AddTodo;
