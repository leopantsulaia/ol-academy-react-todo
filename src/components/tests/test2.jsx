//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
// IT DOES NOTHING
// this file helps me to analyze the problems, to try and store
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////


import React from "react";
import "./todo.scss";
import TodoItem from "./TodoItem.jsx";
class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ text: "learn react", id: 1 }],
      inputValue: "",
      editingTodoId: null,
      editingTodoText: "",
      isDone : false,
    };
  }
  handleAddTodo = () => {
    const usedIds = this.state.todos.map((todo) => todo.id);
    let newId = 0;
    if (usedIds.length > 0) {
      newId = Math.max(...usedIds) + 1;
    }

    // console.log({ usedIds });
    this.setState({
      todos: [...this.state.todos, { text: this.state.inputValue, id: newId }],
      inputValue: "",
    });
  };
  handleDelete = (id) => {
    const filterTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: filterTodos });
  };
  handleDone = (id) => {
    const filterDone = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: true };
      }
      return todo;
    });
    this.setState({ todos: filterDone });
  };
  handleEdit = (id) => {
    const todo = this.state.todos.find((todo) => todo.id === id);
    this.setState({
      editingTodoId: id,
      editingTodoText: todo.text,
    });
  };
  handleUpdate = () => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === this.state.editingTodoId) {
        return { ...todo, text: this.state.editingTodoText };
      }
      return todo;
    });
    this.setState({
      todos: updatedTodos,
      editingTodoId: null,
      editingTodoText: "",
    });
  };
  handleCancel = () => {
    this.setState({
      editingTodoId: null,
      editingTodoText: "",
    });
  };
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
                      type="text"
                      value={this.state.editingTodoText}
                      onChange={(e) =>
                        this.setState({ editingTodoText: e.target.value })
                      }
                    />
                    <button onClick={this.handleUpdate}>Save</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDelete={this.handleDelete}
                    handleDone={this.handleDone}
                    handleEdit={this.handleEdit}
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
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}
export default Todo;
