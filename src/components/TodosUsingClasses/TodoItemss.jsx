import React from "react";

function TodoItem(props) {
  const handleDelete = () => {
    props.handleDelete(props.todo.id);
  };
  const handleDone = () => {
    props.handleDone(props.todo.id);
  };
  const handleEdit = () => {
    props.handleEdit(props.todo.id);
  };
  const handleMove = (direction) => {
    props.handleMove(props.todo.id, direction);
  };
  const handleCheck = () => {
    props.handleCheck(props.todo.id);
  };
  return (
    <li key={props.todo.id}>
      <div>
        {props.todo.text}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleDone}>Done</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => handleMove("up")}>Move Up</button>
        <button onClick={() => handleMove("down")}>Move Down</button>
        <input
          type='checkbox'
          onClick={handleCheck}
        />
      </div>
    </li>
  );
}

export default TodoItem;

