import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./contexts/TodoContext";
import { Todo } from "./interface";
import TodoItem from "./components/TodoItem";
import Filter from "./components/Filter";

function App() {
  const [todoList, setTododList] = useState<Todo[]>(getLocalStorage());
  const [filterValue, setFilterValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  function addTodo(todo: string) {
    setTododList((prev) => [
      { id: Date.now(), text: todo, complete: false },
      ...prev,
    ]);
  }

  function deleteTodo(id: number) {
    setTododList((prev) => prev.filter((todo) => todo.id != id));
  }

  function toggleTodo(id: number) {
    setTododList((prev) =>
      prev.map((todo) =>
        todo.id == id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function updateTodo(id: number, text: string) {
    console.log("Text", text);
    setTododList((prev) =>
      prev.map((todo) => (todo.id == id ? { ...todo, text: text } : todo))
    );
  }

  function filter(value: string) {
    setFilterValue(value);
  }

  function search(value: string) {
    setSearchValue(value);
  }

  function setLocalStorage() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
  }

  function getLocalStorage() {
    let todoList = localStorage.getItem("todolist");
    if (todoList) {
      return JSON.parse(todoList);
    }

    return [];
  }

  // Need to remove
  useEffect(setLocalStorage, [todoList]);

  return (
    <TodoProvider
      value={{
        todoList,
        filterValue,
        searchValue,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
        filter,
        search,
      }}>
      <div className="main">
        <div className="container">
          <h1 className="text-center py-3">Today Todo</h1>
          <Filter />
          <div className="my-4">
            {todoList
              .filter((todo) => {
                let matchSearch =
                  searchValue == "" ||
                  todo.text.toLowerCase().includes(searchValue.toLowerCase());
                let matchFilter =
                  filterValue == "all" ||
                  (filterValue == "completed" && todo.complete) ||
                  (filterValue == "incomplete" && !todo.complete);
                return matchFilter && matchSearch;
              })
              .map((todo) => {
                return <TodoItem key={todo.id} todo={todo} />;
              })}
          </div>
          <TodoForm />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
