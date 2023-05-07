//versia 1
// const handlers =  {
//   handleAddTodo: (ragaca) => {ragaca
//   },
//   handleDelete: (ragaca) => {ragaca},
// }
//export default handlers;

//versia 2
// export const handlers = {.............}

//versia 3 es yvela

const handleAddTodo = (state, setState) => {
  const usedIds = state.todos.map((todo) => todo.id);
  let newId = 0;
  if (usedIds.length > 0) {
    newId = Math.max(...usedIds) + 1;
  }

  setState({
    todos: [...state.todos, { text: state.inputValue, id: newId }],
    inputValue: "",
  });
};

const handleDelete = (id, state, setState) => {
  const filterTodos = state.todos.filter((todo) => todo.id !== id);
  setState({ todos: filterTodos });
};

const handleDone = (id, state, setState) => {
  const filterDone = state.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isDone: true };
    }
    return todo;
  });
  setState({ todos: filterDone });
};

const handleEdit = (id, state, setState) => {
  const todo = state.todos.find((todo) => todo.id === id);
  setState({
    editingTodoId: id,
    editingTodoText: todo.text,
  });
};

const handleCheck = (id, state, setState) => {
  const checkedTodos = state.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isChecked: !todo.isChecked };
    }
    return todo;
  });
  setState({ todos: checkedTodos });
};

const handleUpdate = (state, setState) => {
  const updatedTodos = state.todos.map((todo) => {
    if (todo.id === state.editingTodoId) {
      return { ...todo, text: state.editingTodoText };
    }
    return todo;
  });
  setState({
    todos: updatedTodos,
    editingTodoId: null,
    editingTodoText: "",
  });
};

const handleCancel = (setState) => {
  setState({
    editingTodoId: null,
    editingTodoText: "",
  });
};

const handleUp = (id, state, setState) => {
  const currentIndex = state.todos.findIndex((todo) => todo.id === id);
  if (currentIndex > 0) {
    const newTodos = [...state.todos];
    const temp = newTodos[currentIndex];
    newTodos[currentIndex] = newTodos[currentIndex - 1];
    newTodos[currentIndex - 1] = temp;
    setState({ todos: newTodos });
  }
};

const handleDown = (id, state, setState) => {
  const currentIndex = state.todos.findIndex((todo) => todo.id === id);
  if (currentIndex < state.todos.length - 1) {
    const newTodos = [...state.todos];
    const temp = newTodos[currentIndex];
    newTodos[currentIndex] = newTodos[currentIndex + 1];
    newTodos[currentIndex + 1] = temp;
    setState({ todos: newTodos });
  }
};

export { handleAddTodo, handleDelete, handleDone, handleEdit, handleCheck, handleUpdate, handleCancel, handleUp, handleDown };
