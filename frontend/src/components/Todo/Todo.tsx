import React from 'react'

import { TodoProps } from './Todo.types'

const Todo = ({ name, isCompleted }: TodoProps) => {
    return (
        <div className='flex'>
            <input
                type="checkbox"
            />

            <p>{name}</p>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                role="img"
                aria-label='Delete Todo'
            >
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
        </div>
    )
}

export default Todo