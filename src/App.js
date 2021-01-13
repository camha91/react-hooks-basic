import React, { useState } from 'react';
import './App.css';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';

function App() {
  const [todoList, settodoList] = useState([
    { id: 1, title: 'Learning React Hooks' },
    { id: 2, title: 'Doing Chat App Project' },
    { id: 3, title: 'Doing Netflix Project' },
  ]);

  function handleTodoClick(todo) {
    const newTodoList = todoList.filter((x) => x.id !== todo.id);
    return settodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Todo List</h1>

      <TodoList
        todos={todoList}
        onTodoClick={handleTodoClick}
      />
    </div>
  );
}

export default App;
