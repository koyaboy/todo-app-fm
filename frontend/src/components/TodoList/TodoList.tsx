import React from 'react'

import { TodoProps } from '../Todo/Todo.types'
import Todo from '../Todo/Todo'

const TodoList = ({ todos }: { todos: TodoProps[] }) => {
    return (
        <main className='relative -top-20 px-4'>
            <div className=' bg-white flex gap-4 items-center p-4 rounded-md'>
                <div className='w-5 h-5 rounded-full border border-lightMode-light-grayish-blue'></div>

                <input
                    type="text"
                    placeholder='Create a new todo...'
                    className='bg-transparent'
                />
            </div>

            <div className='mt-2 bg-white rounded-md shadow-lg'>
                {todos?.map((todo) => (
                    <>
                        <Todo
                            key={todo._id}
                            _id={todo._id}
                            name={todo.name}
                            isCompleted={todo.isCompleted}
                        />
                    </>
                ))}

                <div className='flex justify-between p-4'>
                    <p>{todos.length} items left</p>
                    <button>Clear Completed</button>
                </div>
            </div>

            <div className='bg-white flex justify-center gap-3 mt-4 py-2 shadow-lg'>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>


        </main>
    )
}

export default TodoList