import { useCallback } from 'react';

export const useTodoStatus = (updateLocalTodo, addLocalTodo) => {
  const handleToggle = useCallback((todo) => {
    if (todo.isLocal) {
      updateLocalTodo(todo.id, { completed: !todo.completed });
    } else {
      const localCopy = {
        ...todo,
        isLocal: true,
        completed: !todo.completed,
        id: `local_${todo.id}`,
        createdAt: new Date().toISOString()
      };
      addLocalTodo(localCopy);
    }
  }, [updateLocalTodo, addLocalTodo]);

  return { handleToggle };
};