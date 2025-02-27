import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTodos } from "./api/todoApi";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState([]);

  const { data } = useQuery(["todos", page], () => getTodos(page), {
    keepPreviousData: true,
  });

  useEffect(() => {
    setState(data);
  }, []);

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
};
