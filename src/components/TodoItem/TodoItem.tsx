import { IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import type { ITodoItemProps } from '../../types/todo';

const TodoItem = ({ todo, toggleTodo, editTodo, deleteTodo }: ITodoItemProps) => {
  return (
    <ListItem>
      <Stack direction="row" alignItems="center" width="100%" spacing={1}>
        <IconButton onClick={() => toggleTodo(todo.id)}>
          {todo.completed ? (
            <TaskAltRoundedIcon color="secondary" />
          ) : (
            <RadioButtonUncheckedRoundedIcon />
          )}
        </IconButton>

        <ListItemText
          primary={todo.title}
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: (theme) =>
              todo.completed ? theme.palette.text.secondary : theme.palette.text.primary,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}
        />

        <Typography
          sx={{
            minWidth: 'fit-content',
            textAlign: 'right',
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {new Date(todo.date).toLocaleDateString('ru-RU')}
        </Typography>

        <Stack direction="row">
          <IconButton aria-label="edit" onClick={() => editTodo(todo.id, todo.title)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => deleteTodo(todo.id)}>
            <DeleteRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default TodoItem;
