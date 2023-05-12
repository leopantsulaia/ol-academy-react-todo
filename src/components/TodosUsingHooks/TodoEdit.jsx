// TodoEdit.js
import React, { useState } from "react";

function TodoEdit(props) {
  const [editingTodoText, setEditingTodoText] = useState(props.todo.text);
  const handleUpdate = () => {
    props.onUpdate(editingTodoText);
  };
  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <div>
      <input
        type='text'
        value={editingTodoText}
        onChange={(e) => setEditingTodoText(e.target.value)}
      />
      <button onClick={handleUpdate}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default TodoEdit;
