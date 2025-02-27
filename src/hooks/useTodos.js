import { useState, useEffect } from 'react';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      title: todo.title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
};