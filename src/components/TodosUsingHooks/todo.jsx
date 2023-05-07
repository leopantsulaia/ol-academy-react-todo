import React, { useState } from "react";
import "./todo.scss";
import TodoItem from "./TodoItem.jsx";

function Todo(props) {
  const [todos, setTodos] = useState([{ text: "learn react", id: 1 }]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleAddTodo = () => {
    const usedIds = todos.map((todo) => todo.id);
    let newId = 0;
    if (usedIds.length > 0) {
      newId = Math.max(...usedIds) + 1;
    }
    setTodos([...todos, { text: inputValue, id: newId }]);
    setInputValue("");
  };

  const handleDelete = (id) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
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

  // up and down

  const handleUp = (id) => {
    const currentIndex = todos.findIndex((todo) => todo.id === id);
    if (currentIndex > 0) {
      const newTodos = [...todos];
      const temp = newTodos[currentIndex];
      newTodos[currentIndex] = newTodos[currentIndex - 1];
      newTodos[currentIndex - 1] = temp;
      setTodos(newTodos);
    }
  };

  const handleDown = (id) => {
    const currentIndex = todos.findIndex((todo) => todo.id === id);
    if (currentIndex < todos.length - 1) {
      const newTodos = [...todos];
      const temp = newTodos[currentIndex];
      newTodos[currentIndex] = newTodos[currentIndex + 1];
      newTodos[currentIndex + 1] = temp;
      setTodos(newTodos);
    }
  };

  const handleDeleteAll = () => {
    setTodos([]);
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
                  handleUp={() => handleUp(todo.id)}
                  handleDown={() => handleDown(todo.id)}
                />
              )}
            </div>
          ))}
        </ul>
      ) : (
        <div>
          <p>No Todos</p>
        </div>
      )}
      <div>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div>
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
      <button
        className='Delete-all'
        onClick={handleDeleteAll}
      >
        delete all todos
      </button>
    </div>
  );
}
export default Todo;
