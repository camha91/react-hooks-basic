import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import './App.css';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

function App() {
  const [todoList, settodoList] = useState([
    { id: 1, title: 'Learning React Hooks' },
    { id: 2, title: 'Doing Chat App Project' },
    { id: 3, title: 'Doing Netflix Project' },
  ]);

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        console.log({ responseJson });

        const { data, pagination } = responseJson;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log('New Page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

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
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
