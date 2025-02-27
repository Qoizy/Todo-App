export const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
    // Sort by local first
    if (a.isLocal && !b.isLocal) return -1;
    if (!a.isLocal && b.isLocal) return 1;
    
    // Then by completion status
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    
    // Finally by creation date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};