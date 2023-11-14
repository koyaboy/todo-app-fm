import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

// import {
//   useQuery
// } from '@tanstack/react-query'

// import { getTodos } from './utils/api';

function App() {
  return (
    <>
      <div className='bg-lightMode-very-light-gray dark:bg-darkMode-very-dark-blue min-h-screen'>
        <>
          <Header />
          <TodoList />
        </>
      </div>
    </>
  );
}

export default App;
