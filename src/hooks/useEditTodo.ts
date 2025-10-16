import { useState } from 'react';
import type { ITodo } from '../types/todo';

interface useEditTodoProps {
  setTodoData: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function useEditTodo({ setTodoData }: useEditTodoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState<string | null>('');

  const [editError, setEditError] = useState<boolean>(false);

  const editTodo = (id: string, title: string) => {
    setCurrentTodoId(id);
    setEditTitle(title);
    setIsModalOpen(true);
  };

  const saveEditing = () => {
    if (!currentTodoId) return;

    setTodoData((prev) =>
      prev.map((todo) => (todo.id === currentTodoId ? { ...todo, title: editTitle } : todo))
    );

    setIsModalOpen(false);
    setCurrentTodoId(null);
    setEditTitle('');
  };

  return { isModalOpen, setIsModalOpen, editError, setEditError, editTodo, saveEditing, editTitle, setEditTitle }
}
