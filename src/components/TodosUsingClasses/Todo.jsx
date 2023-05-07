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
      isDone: false,
      isChecked: false,
      // alreadyExists: false, // ეს ვერ ავამუშავე და წავშალე //
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

  handleCheck = (id) => {
    const checkedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });
    this.setState({ todos: checkedTodos });
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

  // up and down

  handleUp = (id) => {
    const currentIndex = this.state.todos.findIndex((todo) => todo.id === id);
    if (currentIndex > 0) {
      const newTodos = [...this.state.todos];
      const temp = newTodos[currentIndex];
      newTodos[currentIndex] = newTodos[currentIndex - 1];
      newTodos[currentIndex - 1] = temp;
      this.setState({ todos: newTodos });
    }
  };

  handleDown = (id) => {
    const currentIndex = this.state.todos.findIndex((todo) => todo.id === id);
    if (currentIndex < this.state.todos.length - 1) {
      const newTodos = [...this.state.todos];
      const temp = newTodos[currentIndex];
      newTodos[currentIndex] = newTodos[currentIndex + 1];
      newTodos[currentIndex + 1] = temp;
      this.setState({ todos: newTodos });
    }
  };

  handleDeleteAll = () => {
    this.setState({ todos: [] });
    }

  render() {
    return (
      <div className='main-div'>
        <h1>{this.props.title}</h1>
        {this.state.todos.length > 0 ? (
          <ul>
            {this.state.todos.map((todo) => (
              <div className={todo.isDone ? "done" : ""}
                key={todo.id}>
                {this.state.editingTodoId === todo.id ? (
                  <div>
                    <input
                      type='text'
                      value={this.state.editingTodoText}
                      onChange={(e) => this.setState({ editingTodoText: e.target.value })}
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
                    handleCheck={this.handleCheck}
                    handleUp={() => this.handleUp(todo.id)}
                    handleDown={() => this.handleDown(todo.id)}
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
          <div>
            <button onClick={this.handleAddTodo}>Add Todo</button>
          </div>
        </div>
        <button className="Delete-all" onClick={this.handleDeleteAll}>delete all todos</button>
      </div>
    );
  }
}

export default Todo;
