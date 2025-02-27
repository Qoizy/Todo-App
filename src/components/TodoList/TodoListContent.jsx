import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const TodoListContent = ({ todos }) => {
  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <p>No todos found</p>
      </div>
    );
  }

  return (
    <div className="todo-list" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoListContent;

//   return (
//     <div className="todo-list" role="list" aria-label="Todo list">
//       {todos.map((todo) => (
//         <TodoItem
//           key={todo.id} // Ensure `todo.id` is unique
//           todo={todo}
//           onToggle={() => onToggle(todo)}
//           onEdit={(updates) => onEdit(todo.id, updates)}
//           onDelete={() => onDelete(todo.id)}
//         />
//       ))}
//     </div>
//   );
// };

