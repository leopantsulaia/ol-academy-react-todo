function Todo(props) {
  // ...
  const handleDone = (id) => {
    const filterDone = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(filterDone);
  };
  const handleDelete = (id) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
  };

  return (
    <div className='main-div'>
      {/* ... */}
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <div
              className={todo.isDone ? "done" : ""}
              key={todo.id}
            >
              <TodoItem
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
                handleCheck={handleCheck}
                handleMove={(id, direction) => handleMove(todo.id, direction)}
                isDone={todo.isDone}
              />
            </div>
          ))}
        </ul>
      ) : (
        {/* ... */}
      )}
    </div>
  );
}

class TodoItem extends React.Component {
  render() {
    const {
      todo,
      handleDelete,
      handleDone,
      handleEdit,
      handleCheck,
      handleMove,
      isDone,
    } = this.props;

    const deleteButton = isDone && (
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    );

    return (
      <li>
        <input
          type='checkbox'
          checked={todo.isChecked}
          onChange={() => handleCheck(todo.id)}
        />
        <span className={todo.isDone ? "done" : ""}>{todo.text}</span>
        <button onClick={() => handleDone(todo.id)}>
          {todo.isDone ? "Undo" : "Done"}
        </button>
        {deleteButton}
        <button onClick={() => handleEdit(todo.id)}>Edit</button>
        <button
          onClick={() => handleMove(todo.id, "up")}
          disabled={todo.id === 1}
        >
          Up
        </button>
        <button
          onClick={() => handleMove(todo.id, "down")}
          disabled={todo.id === todos.length}
        >
          Down
        </button>
      </li>
    );
  }
}
