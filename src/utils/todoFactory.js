export const createNewTodo = (title, description = '') => ({
  title: title.trim(),
  description: description.trim(),
  completed: false,
  userId: 1
});