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
}: IEditTodoProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "20px",
            p: 2,
            boxShadow: "10px 10px 0px #00000089",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={7}>
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
                sx={{ fontSize: { xs: "24px" } }}
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
                sx={{ width: "100%" }}
                variant="filled"
                size="small"
                hiddenLabel
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
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
