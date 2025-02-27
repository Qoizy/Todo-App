import { useMutation, useQueryClient } from 'react-query';
import { createTodo, updateTodoStatus, deleteTodo } from '../api/todoApi';
import { createNewTodo } from '../utils/todoFactory';

export const useTodoMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (todoData) => createTodo(createNewTodo(todoData.title, todoData.description)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  const updateStatusMutation = useMutation(
    ({ id, completed }) => updateTodoStatus(id, completed),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  const deleteMutation = useMutation(
    (id) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  return {
    createTodo: createMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    deleteTodo: deleteMutation.mutate,
    isLoading: createMutation.isLoading || updateStatusMutation.isLoading || deleteMutation.isLoading,
  };
};