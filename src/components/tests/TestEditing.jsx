import React from "react";

class TestEditing extends React.Component {
  render() {
    return (
  <div>
    <input
      type='text'
      value={this.props.editingTodoText}
      onChange={(e) => this.props.onEditChange(e.target.value )}
    />
    <button onClick={this.props.handleUpdate}>Save</button>
    <button onClick={this.props.handleCancel}>Cancel</button>
  </div>
   )
  }
}

export default TestEditing;