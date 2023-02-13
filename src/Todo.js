import React from 'react';

function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          // two ways of doing the next command - second way commented out
          // the first is a reference to a function; not callling directly, hence no braces ()
          onChange={handleTodoClick}
          //onChange={() => toggleTodo(todo.id)}
        ></input>
        {todo.name}
      </label>
    </div>
  );
}

export default Todo;
