import React from 'react';

import { Header } from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

import {
  useQuery
} from '@tanstack/react-query'

import { getTodos } from './utils/api';

function App() {

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })

  if (isLoading) {
    return <div>Loading..</div>
  }

  return (
    <>
      <Header />
      <TodoList todos={todos} />
    </>
  );
}

export default App;
