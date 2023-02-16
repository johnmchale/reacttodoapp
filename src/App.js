import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import styles from './app.module.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const date = new Date();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearCompletedTodos() {
    // i.e. just keep the ones that are NOT complete
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleClearAllTodos() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setTodos([]);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
      }}
    >
      <h2>To-Do App</h2>

      <label>
        add To-Do:{' '}
        <input
          className={styles.buttonWithBottomMargin}
          ref={todoNameRef}
          type="text"
          onKeyDown={handleKeyDown}
        />
        <button
          className={`${styles.bootstrapStyleButton} ${styles.buttonWithBottomMargin} ${styles.buttonWithLeftMargin}`}
          onClick={handleAddTodo}
        >
          Save
        </button>
      </label>

      <button
        className={`${styles.bootstrapStyleSecondaryButton} ${styles.buttonWithBottomMargin}`}
        onClick={handleClearCompletedTodos}
      >
        Clear Completed To-Dos
      </button>
      <button
        className={`${styles.bootstrapStyleSecondaryButton} ${styles.buttonWithBottomMargin}`}
        onClick={handleClearAllTodos}
      >
        Clear ALL To-Dos
      </button>

      {todos.length > 0 && (
        <>
          <p>_________________</p>
          <h4>
            Todos:{' '}
            {new Intl.DateTimeFormat('en-UK', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }).format(date)}
          </h4>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <p>_________________</p>

          <div>
            {todos.filter((todo) => !todo.complete).length} items left to do{' '}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
