import React from 'react'

import { TodoProps } from '../Todo/Todo.types'
import Todo from '../Todo/Todo'

const TodoList = ({ todos }: { todos: TodoProps[] }) => {
    return (
        <main className='relative -top-20 px-4'>
            <div className=' bg-white flex gap-4 items-center px-3 py-[6px] rounded-md'>
                <div className='w-5 h-5 rounded-full border border-lightMode-light-grayish-blue'></div>

                <input
                    type="text"
                    placeholder='Create a new todo...'
                    className='bg-transparent'
                />
            </div>

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
        </main>
    )
}

export default TodoList