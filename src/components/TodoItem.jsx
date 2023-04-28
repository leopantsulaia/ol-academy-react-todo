import React from "react";

class TodoItem extends React.Component {
  render() {
    return (
      <li key={this.props.todo.id}>
        <div>
          {this.props.todo.text}
          <button onClick={() => this.props.handleDelete(this.props.todo.id)}>Delete</button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
