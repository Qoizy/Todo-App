import { useMemo } from 'react';
import { useLocalTodos } from './useLocalTodos';
import { useTodoList } from './useApi';
import { useTodoStatus } from './useTodoStatus';
import { filterTodos, sortTodos } from '../utils/todoUtils';

export const useCombinedTodos = (page, searchTerm = '', filter = 'all') => {
  const { 
    localTodos, 
    addLocalTodo, 
    updateLocalTodo, 
    deleteLocalTodo, 
    getLocalTodoById 
  } = useLocalTodos();
  
  const { data, isLoading, error } = useTodoList(page);
  const { handleToggle } = useTodoStatus(updateLocalTodo, addLocalTodo);

  const combinedTodos = useMemo(() => {
    const apiTodos = data?.todos?.map(todo => ({
      ...todo,
      isLocal: false,
      createdAt: new Date().toISOString()
    })) || [];
    
    const allTodos = [...localTodos, ...apiTodos];
    const filteredTodos = filterTodos(allTodos, searchTerm, filter);
    const sortedTodos = sortTodos(filteredTodos);
    
    const startIndex = (page - 1) * 10;
    return sortedTodos.slice(startIndex, startIndex + 10);
  }, [localTodos, data, searchTerm, filter, page]);

  const totalCount = useMemo(() => {
    const apiTodos = data?.todos || [];
    return Math.ceil((localTodos.length + apiTodos.length) / 10);
  }, [localTodos, data]);

  return {
    todos: combinedTodos,
    totalCount,
    isLoading,
    error,
    addLocalTodo,
    handleToggle,
    updateLocalTodo,
    deleteLocalTodo,
    getLocalTodoById
  };
};