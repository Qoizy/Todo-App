import { useState, useEffect } from "react";

const STORAGE_KEY = "local_todos";

export const useLocalTodos = () => {
  const [localTodos, setLocalTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localTodos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [localTodos]);

  const addLocalTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      title: todo.title,
      description: todo.description || "",
      completed: false,
      isLocal: true,
      createdAt: new Date().toISOString(),
    };
    setLocalTodos((prevTodos) => [newTodo, ...prevTodos]);
    return newTodo;
  };

  const updateLocalTodo = (id, updates) => {
    setLocalTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteLocalTodo = (id) => {
    setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getLocalTodoById = (id) => {
    return localTodos.find((todo) => todo.id === id);
  };

  return {
    localTodos,
    addLocalTodo,
    updateLocalTodo,
    deleteLocalTodo,
    getLocalTodoById,
  };
};
