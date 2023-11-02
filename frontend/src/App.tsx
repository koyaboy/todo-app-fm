import React from 'react';
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
        <Header />


        <TodoList />


        <footer className='text-lightMode-dark-grayish-blue mx-auto w-80% md:w-[50%] flex justify-center -mt-8 py-9'>
          Drag and drop to reorder list
        </footer>
      </div>
    </>
  );
}

export default App;
