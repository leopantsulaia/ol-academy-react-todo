// import at first
import React from "react";
import "./todo.scss";
import TodoItem from "./TodoItem.jsx";


// class ... extends React.Component{constructor(props}{super(props)}
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
    let newId = 0;
    if(usedIds.length > 0) {
      newId= Math.max(...usedIds) + 1;
    }

    console.log({ usedIds });
    this.setState({
      todos: [...this.state.todos, { text: this.state.inputValue, id: newId }],
      inputValue: "",
    });
  };
 
  handleDelete = (id) => {
    const filterTodos = this.state.todos.filter(
      todo => todo.id !== id
    )
    this.setState({todos: filterTodos});
  };

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>

        {this.state.todos.length > 0 ? (
          <div>
            <ul>
              {this.state.todos?.map((todo) => (
                <TodoItem 
                key={todo.id}
                todo={todo}
                handleDelete={this.handleDelete}
                />
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
