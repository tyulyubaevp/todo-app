import { CssBaseline, IconButton, Stack, Typography } from '@mui/material';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import EditTodo from './components/EditTodo/EditTodo';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from './theme/theme';
import useTodos from './hooks/useTodos';
import useThemeMode from './hooks/useThemeMode';
import useEditTodo from './hooks/useEditTodo';

function App() {
  const { addTodo, deleteTodo, toggleTodo, todoData, setTodoData } = useTodos();
  const {
    isModalOpen,
    setIsModalOpen,
    editError,
    setEditError,
    editTodo,
    saveEditing,
    editTitle,
    setEditTitle,
  } = useEditTodo({
    setTodoData,
  });
  const { mode, toggleMode } = useThemeMode();

  const theme = getTheme(mode);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          direction={'column'}
          spacing={5}
          sx={{
            maxWidth: 600,
            margin: '0 auto',
            paddingTop: '25px',
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
            <Typography variant="h1" component="h1" color="#fff" sx={{ fontSize: { xs: '44px' } }}>
              Todo App
            </Typography>
            <IconButton onClick={toggleMode} sx={{ position: 'relative', width: 90, height: 90 }}>
              <DarkModeRoundedIcon
                fontSize="large"
                sx={{
                  color: '#fff',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: mode === 'dark' ? 1 : 0,
                  transform: mode === 'dark' ? 'scale(1)' : 'scale(0.5)',
                  fontSize: '90px',
                }}
              />
              <LightModeRoundedIcon
                fontSize="large"
                sx={{
                  color: '#fff',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  opacity: mode === 'light' ? 1 : 0,
                  transform: mode === 'light' ? 'scale(1)' : 'scale(0.5)',
                  fontSize: '90px',
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
