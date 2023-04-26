import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ text: "learn react", id: 1 }],
      inputValue: "",
    };
  }

  // handleAddTodoVerse1 = () => {
  // const todos = [...this.state.todos];
  //   todos.push(this.state.inputValue);
  // this.setState({todos: todos});
  // }

  handleAddTodo = () => {
    const usedIds = this.state.todos.map((todo) => todo.id);
    const newId = Math.max(...usedIds) + 1;
    console.log({ usedIds });
    this.setState({
      todos: [...this.state.todos, { text: this.state.inputValue, id: "" }],
      inputValue: "",
    });
  };

  handleDelete = () => {
    console.log("delete");
  };

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>

        {this.state.todos.length > 0 ? (
          <div>
            <ul>
              {this.state.todos?.map((todo) => (
                <li key={todo.id}>
                  <div>
                    {todo.text}
                    <button onClick={this.handleDelete}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default Todo;
