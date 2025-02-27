import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';

export const useTodoList = (page) => {
  return useQuery(
    ['todos', page], 
    () => getTodos(page),
    {
      keepPreviousData: true,
      staleTime: 1 * 60 * 1000,
    }
  );
};

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation(
    (todo) => createTodo(todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Failed to add todo:', error);
      }
    }
  );

  const updateMutation = useMutation(
    ({ id, ...updates }) => updateTodo(id, updates),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Failed to update todo:', error);
      }
    }
  );

  const deleteMutation = useMutation(
    (id) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Failed to delete todo:', error);
      }
    }
  );

  return {
    addMutation,
    updateMutation,
    deleteMutation,
  };
};