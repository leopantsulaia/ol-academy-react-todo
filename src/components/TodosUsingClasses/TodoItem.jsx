import React from "react";

class TodoItem extends React.Component {
  render() {
    return (
      <li key={this.props.todo.id}>
        <div>
          {this.props.todo.text}
          <button onClick={() => this.props.handleDelete(this.props.todo.id)}>Delete</button>
          <button onClick={() => this.props.handleDone(this.props.todo.id)}>Done</button>
          <button onClick={() => this.props.handleEdit(this.props.todo.id)}>Edit</button>
          <button onClick={() => this.props.handleMove(this.props.todo.id, "up")}>Move Up</button>
          <button onClick={() => this.props.handleMove(this.props.todo.id, "down")}>Move Down</button>
          <input
            type='checkbox'
            onClick={() => this.props.handleCheck(this.props.todo.id)}
          />
        </div>
      </li>
    );
  }
}
export default TodoItem;
