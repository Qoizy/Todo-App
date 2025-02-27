import { useQuery } from "react-query";
import { getTodos } from "../api/todoApi";

export const useTodoList = (page) => {
  const { data, isLoading, error } = useQuery(
    ["todos", page],
    () => getTodos(page, 10),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  return {
    todos: data?.todos || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    error,
  };
};
