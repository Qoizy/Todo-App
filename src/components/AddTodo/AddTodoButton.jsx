import React from 'react';
import './AddTodoButton.css';

const AddTodoButton = ({ onClick }) => {
  return (
    <button 
      className="add-todo-button" 
      onClick={onClick}
      aria-label="Add new todo"
    >
      +
    </button>
  );
};

export default AddTodoButton;