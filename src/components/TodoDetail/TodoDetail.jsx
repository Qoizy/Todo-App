import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  getTodoById,
  deleteTodo,
  updateTodoStatus,
  editTodo,
} from "../../api/todoApi";
import BackToHome from "../BackToHome/BackToHome";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import "./TodoDetail.css";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ title: "", description: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isLocalTodo = id.toString().startsWith("local_");

  const {
    data: apiTodo,
    isLoading,
    error,
  } = useQuery(["todo", id], () => getTodoById(id), {
    // enabled: !isLocalTodo,
    staleTime: 0,
    cacheTime: 0,
    onError: (error) => {
      console.error("Error fetching todo:", error.message);
    },
  });

  const [todo, setTodo] = useState({});

  useEffect(() => {
    setTodo(apiTodo);
  }, [apiTodo]);

  useEffect(() => {
    if (todo) {
      setEditedTodo({
        title: todo.title,
        description: todo.description || "",
      });
    }
  }, [todo]);

  const handleMarkComplete = async () => {
    try {
      console.log({ apiTodo });
      const newStatus = !todo.completed;

      const updatedTodo = await updateTodoStatus(id, newStatus);
      setTodo(updatedTodo);

      // queryClient.setQueryData(["todo", id], updatedTodo);
      // queryClient.invalidateQueries(["todo", id]);
      // queryClient.invalidateQueries("todo");
    } catch (error) {
      console.error("Error marking todo as complete:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const todos = await deleteTodo(id);
      queryClient.invalidateQueries("todo");

      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    handleDelete();
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = async () => {
    if (!editedTodo?.title?.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const updatedFields = {
      title: editedTodo.title.trim(),
      description: editedTodo.description?.trim() || "",
      completed: todo.completed,
    };

    try {
      const todos = await editTodo(id, updatedFields, navigate);
      console.log({ todos });
      setTodo(todos);

      queryClient.invalidateQueries(["todo", id]);
      queryClient.invalidateQueries("todo");
      console.log("Queries invalidated, cache should refresh");

      setIsModalOpen(false);
      console.log("Edit mode exited");
    } catch (error) {
      console.error("Error editing todo:", error.message);
    }
  };

  if (isLoading && !isLocalTodo) {
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
  }

  if (error) {
    return (
      <div className="error" role="alert">
        Error: {error.message}
        <BackToHome />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="error" role="alert">
        Todo not found
        <BackToHome />
      </div>
    );
  }

  return (
    <div className="todo-detail-page">
      <BackToHome />
      <div className="todo-detail-card">
        <div className="header">
          <h1 className="task-title">Task Details</h1>
          <div
            className={`status-badge ${
              todo.completed ? "completed" : "in-progress"
            }`}
          >
            {todo.completed ? "Completed" : "In Progress"}
          </div>
        </div>

        <div className="content">
          <section>
            <h2 className="section-title">Task Title</h2>
            <p className="task-description">{todo.title}</p>

            <h2 className="section-title">Description</h2>
            <p className="task-description">
              {todo.description || "No description provided"}
            </p>
          </section>

          <div className="meta-info">
            <div className="meta-item">
              <span>Task ID</span>
              <strong>{todo.id}</strong>
            </div>
          </div>
        </div>

        <div className="actions">
          <button
            onClick={() => setIsModalOpen(true)}
            className="action-button edit"
          >
            Edit
          </button>
          <button onClick={handleDeleteClick} className="action-button delete">
            Delete
          </button>
          <button
            onClick={handleMarkComplete}
            className="action-button complete"
          >
            {todo.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
        </div>

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          message="Are you sure you want to delete this todo?"
        />

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Todo</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}
              >
                <label>
                  Title:
                  <input
                    type="text"
                    value={editedTodo?.title || ""}
                    onChange={(e) =>
                      setEditedTodo({ ...editedTodo, title: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    value={editedTodo?.description || ""}
                    onChange={(e) =>
                      setEditedTodo({
                        ...editedTodo,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="action-button cancel"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="action-button save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;
