import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import type { FilterType, ITodoListProps } from "../../types/todo";
import { useEffect, useState } from "react";
import type { Theme } from "@mui/material/styles";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({
  todoData,
  deleteTodo,
  editTodo,
  toggleTodo,
}: ITodoListProps) => {
  const [filterType, setFilterType] = useState<FilterType>("");
  const [order, setOrder] = useState<"to-old" | "to-new">("to-old");

  const filteredTodos =
    filterType === "done"
      ? todoData.filter((todo) => todo.completed)
      : filterType === "not done"
      ? todoData.filter((todo) => !todo.completed)
      : [...todoData];

  filteredTodos.sort((a, b) =>
    order === "to-new" ? b.date - a.date : a.date - b.date
  );

  useEffect(() => {
    if (todoData.length > 0 && filterType === "") {
      setFilterType("all");
    } else if (todoData.length === 0) {
      setFilterType("");
    }
  }, [todoData, filterType]);

  const handleFilter = (_: unknown, newFilter: FilterType) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  const handleOrder = () => {
    setOrder((prev) => (prev === "to-old" ? "to-new" : "to-old"));
  };

  const toggleButtonStyles = (theme: Theme) => ({
    borderRadius: "20px",
    border: "none",
    backgroundColor: theme.palette.background.paper,
    "&.Mui-selected": {
      backgroundColor: theme.palette.secondary.main,
      "& svg": {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      "& svg": {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
      },
    },
    "&:disabled": { border: "none" },
  });

  return (
    <Stack spacing={2}>
      <Box>
        <Stack justifyContent="space-between" direction="row">
          <ToggleButtonGroup
            size="large"
            exclusive
            value={filterType}
            onChange={handleFilter}
            disabled={todoData.length ? false : true}
          >
            <ToggleButton sx={toggleButtonStyles} value="all">
              <SubjectRoundedIcon />
            </ToggleButton>
            <ToggleButton sx={toggleButtonStyles} value="done">
              <CheckRoundedIcon />
            </ToggleButton>
            <ToggleButton sx={toggleButtonStyles} value="not done">
              <QueryBuilderRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            size="large"
            exclusive
            value={order}
            onClick={handleOrder}
            disabled={todoData.length ? false : true}
          >
            <ToggleButton
              sx={toggleButtonStyles}
              value="toggleOrder"
              selected={false}
            >
              <SwapVertRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          maxHeight: "500px",
          borderRadius: "20px",
          backgroundColor: (theme) => theme.palette.background.paper,
          overflowY: "auto",
        }}
      >
        <List sx={{ padding: 0 }}>
          {!filteredTodos.length && (
            <ListItem>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "32px",
                }}
              >
                {filterType === "" || filterType === "all"
                  ? "Задач нет"
                  : filterType === "done"
                  ? "Выполненных задач нет"
                  : "Невыполненных задач нет"}
              </ListItemText>
            </ListItem>
          )}
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
      </Box>
    </Stack>
  );
};

export default TodoList;
