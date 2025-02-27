import React from "react";
import "./TodoControls.css";

const TodoControls = ({
  searchTerm,
  filter,
  onSearchChange,
  onFilterChange,
}) => {
  return (
    <div className="todo-controls">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search todos"
        />
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label="Filter todos"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TodoControls;
