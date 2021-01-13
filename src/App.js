import React, { useState } from 'react';
import './App.css';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, settodoList] = useState([
    { id: 1, title: 'Learning React Hooks' },
    { id: 2, title: 'Doing Chat App Project' },
    { id: 3, title: 'Doing Netflix Project' },
  ]);

  function handleTodoClick(todo) {
    const newTodoList = todoList.filter((x) => x.id !== todo.id);
    settodoList(newTodoList);
  };

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList, newTodo];
    settodoList(newTodoList);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <TodoForm
        onSubmit={handleTodoFormSubmit}
      />
      <TodoList
        todos={todoList}
        onTodoClick={handleTodoClick}
      />
    </div>
  );
}

export default App;
