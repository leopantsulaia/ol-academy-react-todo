import React, { useState } from "react";
import "./todo.scss";
import TodoItem from "./TodoItem.jsx";

function Todo(props) {
  const [todos, setTodos] = useState([{ text: "learn react", id: 1 }]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");

  const handleAddTodo = () => {
    const messageExists = todos.some((todo) => todo.text === inputValue);
    const usedIds = todos.map((todo) => todo.id);

    if (inputValue.match(/^\s*$/) || messageExists) {
      alert("empty message or message already added");
      return false;
    }

    let newId = 0;
    if (usedIds.length > 0) {
      newId = Math.max(...usedIds) + 1;
    }
    setTodos([...todos, { text: inputValue, id: newId }]);
    setInputValue("");
  };
  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };
  const handleDelete = (idToDelete) => {
    setTodos(todos.filter(({ id }) => id !== idToDelete));
  };

  const handleDone = (id) => {
    const filterDone = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(filterDone);
  };

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditingTodoId(id);
    setEditingTodoText(todo.text);
  };
  const handleCheck = (id) => {
    const checkedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });
    setTodos(checkedTodos);
  };
  const handleUpdate = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodoId) {
        return { ...todo, text: editingTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditingTodoText(setEditingTodoText);
  };
  const handleCancel = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
  };
  const handleMove = (id, direction) => {
    const currentIndex = todos.findIndex((todo) => todo.id === id);
    if ((direction === "up" && currentIndex > 0) || (direction === "down" && currentIndex < todos.length - 1)) {
      const offset = direction === "up" ? -1 : 1;
      const newTodos = [...todos];
      const temp = newTodos[currentIndex];
      newTodos[currentIndex] = newTodos[currentIndex + offset];
      newTodos[currentIndex + offset] = temp;
      setTodos(
        newTodos.map((todo, index) => ({
          ...todo,
          isDone: todos[index].isDone,
          isChecked: todos[index].isChecked,
        }))
      );
    }
  };
  const handleDeleteAll = () => {
    const filterChecked = todos.filter((todo) => !todo.isChecked);
    setTodos(filterChecked);
  };
  const handleDeleteDone = () => {
    const filterDone = todos.filter((todo) => !todo.isDone);
    setTodos(filterDone);
  };

  return (
    <div className='main-div'>
      <h1>{props.title}</h1>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <div
              className={todo.isDone ? "done" : ""}
              key={todo.id}
            >
              {editingTodoId === todo.id ? (
                <div>
                  <input
                    type='text'
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleDelete={handleDelete}
                  handleDone={handleDone}
                  handleEdit={handleEdit}
                  handleCheck={handleCheck}
                  handleMove={(id, direction) => handleMove(todo.id, direction)}
                />
              )}
            </div>
          ))}
        </ul>
      ) : (
        // <div>
        <p>No Todos</p>
        // </div>
      )}
      <div>
        <input
          type='text'
          value={inputValue}
          onKeyDown={handleKeyEnter}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div>
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
      <div className='Deletes'>
        <button
          className='Delete-all'
          onClick={handleDeleteAll}
        >
          delete all checked todos
        </button>
        <button
          className='Delete-all'
          onClick={handleDeleteDone}
        >
          delete all done tasks
        </button>
      </div>
    </div>
  );
}
export default Todo;
