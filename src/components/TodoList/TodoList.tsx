import {
  Box,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import type { ITodoListProps } from "../../types/todo";
import { useEffect, useMemo, useState } from "react";

const TodoList = ({
  todoData,
  deleteTodo,
  editTodo,
  toggleTodo,
}: ITodoListProps) => {
  const [filterType, setFilterType] = useState("");
  const [order, setOrder] = useState("to-old");

  const filteredTodos = useMemo(() => {
    let result = [...todoData];

    if (filterType === "done") {
      result = result.filter((todo) => todo.completed);
    } else if (filterType === "not done") {
      result = result.filter((todo) => !todo.completed);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (order === "to-new") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

    return result;
  }, [todoData, filterType, order]);

  useEffect(() => {
    if (todoData.length > 0 && filterType === "") {
      setFilterType("all");
    } else if (todoData.length === 0) {
      setFilterType("");
    }
  }, [todoData, filterType]);

  const handleFilter = (_: unknown, newFilter: string) => {
    if (newFilter !== null) {
      setFilterType(newFilter);
    }
  };

  const handleOrder = () => {
    setOrder((prev) => (prev === "to-old" ? "to-new" : "to-old"));
  };

  const toggleButtonStyles = {
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#fff",
    "&.Mui-selected": {
      backgroundColor: "#42a5f5",
      "& svg": { color: "#fff" },
    },
    "&:hover": {
      backgroundColor: "#42a5f5",
      "& svg": { color: "#fff" },
    },
    "&:disabled": {
      border: "none",
    },
  };

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
          backgroundColor: "#ffffff",
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
          {filteredTodos.map((todo) => {
            return (
              <ListItem key={todo.id}>
                <Stack
                  direction="row"
                  alignItems="center"
                  width="100%"
                  spacing={1}
                >
                  <IconButton onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? (
                      <TaskAltRoundedIcon sx={{ color: "#42a5f5" }} />
                    ) : (
                      <RadioButtonUncheckedRoundedIcon />
                    )}
                  </IconButton>
                  <Tooltip
                    title={todo.title}
                    placement="bottom-start"
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -14],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <ListItemText
                      primary={`${todo.title}`}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "330px",
                        width: "100%",
                        flex: 10,
                      }}
                      slotProps={{
                        primary: {
                          noWrap: true,
                        },
                      }}
                    />
                  </Tooltip>
                  <ListItemText
                    primary={todo.date.split(",")[0]}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  />
                  <Stack direction="row">
                    <IconButton
                      aria-label="edit"
                      onClick={() => editTodo(todo.id, todo.title)}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Stack>
  );
};

export default TodoList;
