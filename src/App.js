import React, { useState, useEffect } from 'react';
import './App.css';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';

function App() {
  const [todoList, settodoList] = useState([
    { id: 1, title: 'Learning React Hooks' },
    { id: 2, title: 'Doing Chat App Project' },
    { id: 3, title: 'Doing Netflix Project' },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    try {
      async function fetchPostList() {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&page=1';
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        console.log({ responseJson });

        const { data } = responseJson;
        setPostList(data);
      }
      fetchPostList();
    } catch (error) {
      console.log('Failed to fetch post list: ', error.message);
    }
  }, []);

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
      <h1>Post List</h1>

      {/* <TodoForm
        onSubmit={handleTodoFormSubmit}
      />
      <TodoList
        todos={todoList}
        onTodoClick={handleTodoClick}
      /> */}

      <PostList posts={postList} />
    </div>
  );
}

export default App;
