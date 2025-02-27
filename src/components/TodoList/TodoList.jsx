import { useState, useEffect } from "react";
import { useTodoList } from "../../hooks/useTodoList";
import { useTodoMutations } from "../../hooks/useTodoMutations";
import { useLocalTodos } from "../../hooks/useLocalTodos";
import TodoListContent from "./TodoListContent";
import TodoControls from "../TodoControls/TodoControls";
import Pagination from "../Pagination/Pagination";
import AddTodoButton from "../AddTodo/AddTodoButton";
import AddTodoModal from "../AddTodo/AddTodoModal";
import { filterTodos } from "../../utils/todoFilters";
import "./TodoList.css";
import { createTodo } from "../../api/todoApi";

const TodoList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateStatus } = useTodoMutations();

  const { todos: apiTodos, totalCount, isLoading, error } = useTodoList(page);
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    setAllTodos(apiTodos);
  }, [apiTodos]);

  const handleAddTodo = async (todo) => {
    const newTodo = await createTodo(todo);
    setAllTodos((prevTodos) => [newTodo, ...prevTodos]);
    setIsModalOpen(false);
  };

  const handleToggle = (todo) => {
    updateStatus({ id: todo.id, completed: !todo.completed });
  };

  if (isLoading)
    return (
      <div className="loading" role="status">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  if (error)
    return (
      <div className="error" role="alert">
        Error: {error.message}
      </div>
    );

  const filteredTodos = filterTodos(allTodos, searchTerm, filter);

  return (
    <div className="todo-list-container">
      <TodoControls
        searchTerm={searchTerm}
        filter={filter}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilter}
      />

      <TodoListContent todos={filteredTodos} onToggle={handleToggle} />

      {allTodos.length > 0 && (
        <Pagination
          page={page}
          totalPages={Math.ceil(totalCount / 10)}
          onPageChange={setPage}
        />
      )}

      <AddTodoButton onClick={() => setIsModalOpen(true)} />

      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTodo}
      />
    </div>
  );
};

export default TodoList;
