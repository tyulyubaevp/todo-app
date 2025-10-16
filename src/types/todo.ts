export interface ITodo {
  id: string;
  date: number;
  title: string;
  completed: boolean;
}

export interface ITodoListProps {
  todoData: ITodo[];
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
}

export interface IEditTodoProps {
  modal: boolean;
  closeModal: () => void;
  editTitle: string;
  setEditTitle: (value: string) => void;
  saveEditing: () => void;
  editError: boolean;
  setEditError: (value: boolean) => void;
}

export interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
}

export type FilterType = "all" | "done" | "not done" | "";
export type OrderType = "to-old" | "to-new";
