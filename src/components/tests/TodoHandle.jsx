import React from "react";
import "./todo.scss";
import TodoItem from "./TodoItem.jsx";
import { handleAddTodo, handleDelete, handleDone, handleEdit, handleCheck, handleUpdate, handleCancel, handleUp, handleDown } from "./TodoFunctions.js";

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ text: "learn react", id: 1 }],
      inputValue: "",
      editingTodoId: null,
      editingTodoText: "",
      isDone: false,
      isChecked: false,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.state.todos.length > 0 ? (
          <ul>
            {this.state.todos.map((todo) => (
              <div className={todo.isDone ? "done" : ""}>
                {this.state.editingTodoId === todo.id ? (
                  <div>
                    <input
                      type='text'
                      value={this.state.editingTodoText}
                      onChange={(e) => this.setState({ editingTodoText: e.target.value })}
                    />
                    <button onClick={handleUpdate.bind(this)}>Save</button>
                    <button onClick={handleCancel.bind(this)}>Cancel</button>
                  </div>
                ) : (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDelete={handleDelete.bind(this)}
                    handleDone={handleDone.bind(this)}
                    handleEdit={handleEdit.bind(this)}
                    handleCheck={handleCheck.bind(this)}
                    handleUp={handleUp.bind(this)}
                    handleDown={handleDown.bind(this)}
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
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button onClick={handleAddTodo.bind(this)}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default Todo;
