import { useState } from "react";
import Modal from "react-modal";
import "./AddTodoModal.css";

Modal.setAppElement("#root");

function AddTodoModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="add-todo-modal"
      overlayClassName="add-todo-modal-overlay"
    >
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="todo-description">Description (optional)</label>
          <textarea
            id="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows="3"
          />
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="add-btn">
            Add Todo
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddTodoModal;
