import { useEffect, useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import type { ITodo } from "./types/todo";
import EditTodo from "./components/EditTodo/EditTodo";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

function App() {
  const [todoData, setTodoData] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState<string | null>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoData));
  }, [todoData]);

  const addTodo = (title: string) => {
    const now = new Date();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      date: now.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      completed: false,
    };

    setTodoData((prev: ITodo[]) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    return setTodoData((prev) => prev.filter((todo) => todo.id != id));
  };

  const editTodo = (id: string, title: string) => {
    setCurrentTodoId(id);
    setEditTitle(title);
    setIsModalOpen(true);
  };

  const saveEditing = () => {
    if (!currentTodoId) return;

    setTodoData((prev) =>
      prev.map((todo) =>
        todo.id === currentTodoId ? { ...todo, title: editTitle } : todo
      )
    );

    setIsModalOpen(false);
    setCurrentTodoId(null);
    setEditTitle("");
  };

  const toggleTodo = (id: string) => {
    setTodoData((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Stack
        direction={"column"}
        spacing={5}
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          paddingTop: "25px",
        }}
        padding='10px'
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          spacing={1}
        >
          <Typography variant="h1" component="h1" color="#fff">
            Todo App
          </Typography>
          <IconButton onClick={toggleDarkMode}>
            {isDarkMode ? (
              <DarkModeRoundedIcon
                fontSize="large"
                sx={{ color: "#fff", fontSize: 90 }}
              />
            ) : (
              <LightModeRoundedIcon
                fontSize="large"
                sx={{ color: "#fff", fontSize: 90 }}
              />
            )}
          </IconButton>
        </Stack>

        <AddTodo addTodo={addTodo} />
        <TodoList
          todoData={todoData}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
        />
      </Stack>
      <EditTodo
        modal={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        saveEditing={saveEditing}
      />
    </>
  );
}

export default App;
