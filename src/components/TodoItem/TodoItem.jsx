import React from 'react';
import { Link } from 'react-router-dom';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  return (
    <Link to={`/todo/${todo.id}`} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.completed && (
          <span className="status-icon">
            <i className="fas fa-check"></i>
          </span>
        )}
      </div>
    </Link>
  );
};

export default TodoItem;