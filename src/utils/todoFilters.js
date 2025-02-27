export const filterTodos = (todos, searchTerm, filter) => {
  if (searchTerm || filter) {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });

    return sortedTodos.filter((todo) => {
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" ? todo.completed : !todo.completed);
      return matchesSearch && matchesFilter;
    });
  }

  return todos;
};
