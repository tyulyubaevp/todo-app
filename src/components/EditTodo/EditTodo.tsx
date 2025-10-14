import {
  Box,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import type { IEditTodoProps } from "../../types/todo";

const EditTodo = ({
  modal,
  closeModal,
  editTitle,
  setEditTitle,
  saveEditing,
  editError,
  setEditError,
}: IEditTodoProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editTitle.trim()) {
      setEditError(true);
      return;
    }

    setEditError(false);
    saveEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Modal open={modal} onClose={closeModal}>
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "20px",
            p: 3,
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 0px #00000040"
                : "10px 10px 0px #00000080",
            transition: "all 0.3s ease",
          })}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              spacing={1}
            >
              <Typography
                variant="h4"
                component="h2"
                color="#00000089"
                sx={(theme) => ({
                  fontSize: { xs: "24px" },
                  color: theme.palette.text.secondary,
                })}
              >
                Редактировать
              </Typography>
              <IconButton onClick={closeModal}>
                <CancelRoundedIcon />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              spacing={1}
            >
              <TextField
                label={editError ? "Введите текст задачи" : ""}
                hiddenLabel={!editError}
                sx={{
                  width: "100%",
                  "& fieldset": {
                    borderRadius: "10px",
                  },
                }}
                variant="outlined"
                size="small"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                error={editError}
              />
              <IconButton type="submit">
                <SaveRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default EditTodo;
