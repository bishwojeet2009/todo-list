import { useState } from "react";
import { Todo } from "../interface";
import useTodo from "../contexts/TodoContext";
function TodoItem({ todo }: { todo: Todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const { deleteTodo, toggleTodo, updateTodo } = useTodo();

  const [isEditable, setIsEditable] = useState(false);

  function updateTodoList() {
    setIsEditable(false);
    updateTodo(todo.id, todoMsg);
  }

  return (
    <div
      className={`d-flex justify-content-between px-3 py-2 input-group todoItem mb-2 ${
        todo.complete ? "bg-success bg-opacity-50" : ""
      }`}>
      <input
        type="checkbox"
        checked={todo.complete}
        onClick={() => {
          toggleTodo(todo.id);
          setIsEditable(false);
        }}
      />
      {isEditable ? (
        <input
          type="text"
          className="form-control ms-2 me-3"
          readOnly={!isEditable}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
      ) : (
        <h5 className="form-control py-0 px-2 mb-0">{todoMsg}</h5>
      )}

      <div className="d-flex align-items-center">
        {isEditable ? (
          <img
            src="src/assets/image/upload.png"
            className="edit"
            alt="Edit"
            width="20px"
            height="20px"
            onClick={updateTodoList}
          />
        ) : (
          <img
            src="src/assets/image/Edit.png"
            className="edit"
            alt="Edit"
            width="20px"
            height="20px"
            onClick={() => {
              if (todo.complete) {
                return;
              } else {
                setIsEditable(true);
              }
            }}
          />
        )}
        <img
          src="src/assets/image/cross.png"
          width="20px"
          height="20px"
          className="delete ms-3"
          onClick={() => deleteTodo(todo.id)}
          alt="Delete"
        />
      </div>
    </div>
  );
}

export default TodoItem;
