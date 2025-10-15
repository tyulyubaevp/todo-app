import { useEffect, useMemo, useState } from "react";
import { CssBaseline, IconButton, Stack, Typography } from "@mui/material";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";
import type { ITodo } from "./types/todo";
import EditTodo from "./components/EditTodo/EditTodo";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme/theme";

function App() {
  const [todoData, setTodoData] = useState<ITodo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState<string | null>("");
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const storedMode = localStorage.getItem("theme");
    return storedMode === "dark" ? "dark" : "light";
  });
  const [editError, setEditError] = useState<boolean>(false);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoData));
  }, [todoData]);

  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title: title,
      date: new Date().getTime(),
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          direction={"column"}
          spacing={5}
          sx={{
            maxWidth: 600,
            margin: "0 auto",
            paddingTop: "25px",
          }}
          padding="10px"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            spacing={1}
          >
            <Typography
              variant="h1"
              component="h1"
              color="#fff"
              sx={{ fontSize: { xs: "44px" } }}
            >
              Todo App
            </Typography>
            <IconButton
              onClick={toggleMode}
              sx={{ position: "relative", width: 90, height: 90 }}
            >
              <DarkModeRoundedIcon
                fontSize="large"
                sx={{
                  color: "#fff",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: mode === "dark" ? 1 : 0,
                  transform: mode === "dark" ? "scale(1)" : "scale(0.5)",
                  fontSize: "90px",
                }}
              />
              <LightModeRoundedIcon
                fontSize="large"
                sx={{
                  color: "#fff",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: mode === "light" ? 1 : 0,
                  transform: mode === "light" ? "scale(1)" : "scale(0.5)",
                  fontSize: "90px",
                }}
              />
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
          editError={editError}
          closeModal={() => {
            setIsModalOpen(false);
            setEditError(false);
          }}
          setEditError={setEditError}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          saveEditing={saveEditing}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
