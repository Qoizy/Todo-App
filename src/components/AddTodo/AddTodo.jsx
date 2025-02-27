import { useState } from 'react';
import './AddTodo.css';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        aria-label="New todo title"
      />
      <button type="submit" aria-label="Add todo">
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;