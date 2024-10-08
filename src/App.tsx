import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./contexts/TodoContext";
import { Todo } from "./interface";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoList, setTododList] = useState<Todo[]>([]);
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
    setTododList((prev) =>
      prev.map((todo) => (todo.id == id ? { ...todo, todo: text } : todo))
    );
  }
  // Need to remove
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <TodoProvider
      value={{ todoList, addTodo, deleteTodo, toggleTodo, updateTodo }}>
      <div className="container-fluid">
        <div className="mb-4">
          {todoList.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </div>

        <TodoForm />
      </div>
    </TodoProvider>
  );
}

export default App;
