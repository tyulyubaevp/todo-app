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
      <Modal open={modal} onClose={closeModal} sx={{ p: { xs: 2, sm: 0 } }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: "100%",
            bgcolor: "#fff",
            borderRadius: "20px",
            p: 2,
            boxShadow: "10px 10px 0px grey",
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
              <Typography variant="h4" component="h2" color="grey">
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
                sx={{ width: "100%", paddingTop: "5px" }}
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
