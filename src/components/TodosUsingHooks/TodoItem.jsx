import React from "react";

function TodoItem({ todo, handleDelete, handleDone, handleEdit, handleMove, handleCheck }) {
  return (
    <li key={todo.id}>
      <div>
        {todo.text}
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
        <button onClick={() => handleDone(todo.id)}>Done</button>
        <button onClick={() => handleEdit(todo.id)}>Edit</button>
        <button onClick={() => handleMove(todo.id, "up")}>Move Up</button>
        <button onClick={() => handleMove(todo.id, "down")}>Move Down</button>
        <input type='checkbox' onClick={() => handleCheck(todo.id)} />
      </div>
    </li>
  );
}

export default TodoItem;
