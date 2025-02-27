import { useCallback } from 'react';
import { createTodo } from '../utils/todoUtils';

export const useTodoActions = (setLocalTodos) => {
  const addLocalTodo = useCallback((todoData) => {
    const newTodo = createTodo(todoData.title, todoData.description);
    setLocalTodos(prev => [newTodo, ...prev]);
    return newTodo;
  }, [setLocalTodos]);

  const updateLocalTodo = useCallback((id, updates) => {
    setLocalTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }, [setLocalTodos]);

  const deleteLocalTodo = useCallback((id) => {
    setLocalTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setLocalTodos]);

  return {
    addLocalTodo,
    updateLocalTodo,
    deleteLocalTodo
  };
};