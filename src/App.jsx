import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import TodoList from "./components/TodoList/TodoList";
import TodoDetail from "./components/TodoDetail/TodoDetail";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorTest from "./components/ErrorTest/ErrorTest";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <TodoList />
                </>
              }
            />
            <Route path="/todo/:id" element={<TodoDetail />} />
            <Route path="/test-error" element={<ErrorTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
