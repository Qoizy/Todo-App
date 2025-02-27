import React from "react";
import { Link } from "react-router-dom";

const TodoItemContent = ({ todo }) => {
  return (
    <div className="todo-content">
      <Link to={`/todo/${todo.id}`} className="todo-link">
        <span className="todo-title">{todo.title}</span>
      </Link>
    </div>
  );
};

export default TodoItemContent;
