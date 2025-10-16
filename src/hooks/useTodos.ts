import { useEffect, useState } from 'react';
import type { ITodo } from '../types/todo';

export default function useTodos() {
  const [todoData, setTodoData] = useState<ITodo[]>(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoData));
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

  const toggleTodo = (id: string) => {
    setTodoData((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return { addTodo, deleteTodo, toggleTodo, todoData, setTodoData };
}
