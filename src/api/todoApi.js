import axios from "axios";

export const localStorageKey = "local_todos";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/todos",
});

const validateTodo = (todo) => {
  if (!todo || typeof todo !== "object") {
    throw new Error("Invalid todo data");
  }
  if (!todo.title || typeof todo.title !== "string") {
    throw new Error("Todo must have a valid title");
  }
  return true;
};

const isLocalId = (id) => {
  if (!id) return false;
  return id.toString().startsWith("local_");
};

const generateLocalId = () => {
  return `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getLocalTodos = () => {
  // const todos = [];
  try {
    const allTodos = localStorage.getItem(localStorageKey) ?? "[]";

    return JSON.parse(allTodos);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
};

export const getTodos = async (page = 1, limit = 10) => {
  try {
    // const validPage = Math.max(1, parseInt(page) || 1);
    // const validLimit = Math.max(1, Math.min(parseInt(limit) || 10, 50));

    // const response = await api.get(`?_page=${validPage}&_limit=${validLimit}`);
    // const apiTodos = response.data.map((todo) => ({
    //   ...todo,
    //   completed: todo.completed || false,
    // }));

    // Get local todos and combine with API todos
    const localTodos = getLocalTodos();
    // const todos = [...localTodos, ...apiTodos];
    const todos = [...localTodos];

    return {
      todos,
    //   totalCount:
    //     parseInt(response.headers["x-total-count"] || "0") + localTodos?.length,
    //   currentPage: validPage,
    //   totalPages: Math.ceil(
    //     (parseInt(response.headers["x-total-count"] || "0") +
    //       localTodos.length) /
    //       validLimit
    //   ),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data || error.message}`);
    }
    throw new Error(`Failed to fetch todos: ${error.message}`);
  }
};

export const getTodoById = async (id) => {
  if (!id) throw new Error("Todo ID is required");

  try {
    if (isLocalId(id)) {
      const todoStr = localStorage.getItem(localStorageKey);
      if (!todoStr) {
        throw new Error(`Todo with ID ${id} not found`);
      }
      const todo = JSON.parse(todoStr);

      const foundTodo = todo.find((todo) => todo.id === id);
      if (!validateTodo(foundTodo)) {
        throw new Error("Invalid todo data in localStorage");
      }
      return foundTodo;
    }

    const response = await api.get(`/${id}`);
    // console.log("response", response);
    return {
      ...response.data,
      completed: response.data.completed || false,
    };
  } catch (error) {
    // console.log({ error });

    if (error.message.includes("not found")) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data || error.message}`);
    }

    throw new Error(`Failed to fetch todo: ${error.message}`);
  }
};

export const createTodo = async (todo) => {
  try {
    validateTodo(todo);

    const newTodo = {
      ...todo,
      id: generateLocalId(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const data = localStorage.getItem(localStorageKey) || "[]";

    localStorage.setItem(
      localStorageKey,
      JSON.stringify([newTodo, ...JSON.parse(data)])
    );

    return newTodo;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

export const updateTodoStatus = async (id, completed) => {
  if (!id) throw new Error("Todo ID is required");

  try {
    if (isLocalId(id)) {
      const todos = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      );

      localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));

      const foundTodo = updatedTodos.find((todo) => todo.id === id);
      return foundTodo;
    } else {
      const response = await api.patch(`/${id}`, { completed });
      console.log({ response });

      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data || error.message}`);
    }
    throw new Error(`Failed to update todo status: ${error.message}`);
  }
};

export const editTodo = async (id, updatedFields, navigate) => {
  if (!id) throw new Error("Todo ID is required");
  if (!updatedFields || typeof updatedFields !== "object") {
    throw new Error("Updated fields must be an object");
  }

  const todos = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

  try {
    if (isLocalId(id)) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updatedFields, updatedAt: new Date().toISOString() }
          : todo
      );

      localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));
      const foundTodo = updatedTodos.find((todo) => todo.id === id);

      return foundTodo;
    }

    // const response = await api.put(`/${id}`, updatedFields);
    let generatedLocalId = generateLocalId();

    localStorage.setItem(
      localStorageKey,
      JSON.stringify([
        ...todos,
        {
          ...updatedFields,
          id: generatedLocalId,
          updatedAt: new Date().toISOString(),
        },
      ])
    );

    const allTodos = await getTodos();
    const foundTodo = allTodos?.todos?.find((todo) => {
      return todo.id === generatedLocalId;
    });

    if (foundTodo) {
      console.log("called");
      navigate(`/todo/${foundTodo.id}`);
    }

    return foundTodo;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data || error.message}`);
    }
    throw new Error(`Failed to edit todo: ${error.message}`);
  }
};

export const deleteTodo = async (id) => {
  if (!id) throw new Error("Todo ID is required");

  try {
    if (isLocalId(id)) {
      const todos = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

      const filterOutTheTodoThatWeWantToDelete = todos.filter(
        (todo) => todo.id !== id
      );

      localStorage.setItem(
        localStorageKey,
        JSON.stringify(filterOutTheTodoThatWeWantToDelete)
      );

      return filterOutTheTodoThatWeWantToDelete;
    }

    const response = await api.delete(`/${id}`);
    console.log({ response });

    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API error: ${error.response?.data || error.message}`);
    }
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
};
