import React from 'react'

import { TodoProps } from './Todo.types'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { deleteTodo, markTodo } from '../../utils/api'


const Todo = ({ _id, name, isCompleted }: TodoProps) => {

    const queryClient = useQueryClient()

    const { mutateAsync: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const { mutateAsync: markTodoMutation } = useMutation({
        mutationFn: markTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    return (
        <div>
            <div className='flex justify-between items-center p-4'>
                <label className={`custom-checkbox ${isCompleted && 'line-through'} ${isCompleted ? 'text-lightMode-light-grayish-blue' : 'text-lightMode-very-dark-grayish-blue'}`}>
                    {name}

                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={async () => {
                            await markTodoMutation(_id)
                        }}
                    />

                    <span className='checkmark flex justify-center items-center'>
                        {isCompleted &&
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="9"
                            >
                                <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
                            </svg>
                        }
                    </span>

                </label>


                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    role="img"
                    aria-label='Delete Todo'
                    onClick={async () => {
                        await deleteTodoMutation(_id)
                    }}
                >
                    <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                </svg>
            </div>

            <hr />
        </div>
    )
}

export default Todo