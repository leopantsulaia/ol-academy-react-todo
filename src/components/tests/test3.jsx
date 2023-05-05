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




// {this.state.todos.map((todo) => (
//   <div className={todo.isDone ? "done" : ""}>
//     {this.state.editingTodoId === todo.id ? (
//       <input
//         type="text"
//         value={this.state.editingTodoText}
//         onChange={(e) =>
//           this.setState({ editingTodoText: e.target.value })
//         }
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             const todos = this.state.todos.map((t) =>
//               t.id === todo.id ? { ...t, text: this.state.editingTodoText } : t
//             );
//             this.setState({
//               todos,
//               editingTodoId: null,
//               editingTodoText: "",
//             });











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
      isDone: false, // new state property to track whether "done" button is pressed or not
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

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.state.todos.length > 0 ? (
          <ul>
            {this.state.todos.map((todo) => (
              <div className={todo.isDone ? "done" : ""}>

              <TodoItem
                key={todo.id}

                todo={todo}

                handleDelete={this.handleDelete}

                handleDone={this.handleDone}

                  isDone={todo.isDone}
                
              />

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
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>
      </div>
    );
  }
}

export default Todo;
