import React from 'react'

import { TodoProps } from './Todo.types'

import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { deleteTodo, markTodo } from '../../utils/api'


const Todo = ({ _id, name, isCompleted, filter }: TodoProps) => {

    const queryClient = useQueryClient()

    const { mutateAsync: deleteTodoMutation } = useMutation({
        mutationFn: deleteTodo,
        onMutate: async (todoId) => {

            await queryClient.cancelQueries({ queryKey: ['todos', { filter }] })

            const previousTodos = queryClient.getQueryData(['todos', { filter }]);

            queryClient.setQueryData(['todos', { filter }], (old: TodoProps[]) => {
                return old.filter((todo) => todo._id !== todoId)
            });

            return { previousTodos }
        },
        onError(error, newTodoName, context) {
            if (context) {
                queryClient.setQueryData(['todos'], context.previousTodos)
            }
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    })

    const { mutateAsync: markTodoMutation } = useMutation({
        mutationFn: markTodo,
        onMutate: async (todoId) => {

            await queryClient.cancelQueries({ queryKey: ['todos', { filter }] })

            const previousTodos = queryClient.getQueryData(['todos', { filter }]);

            queryClient.setQueryData(['todos', { filter }], (old: TodoProps[]) => {
                return old.map((todo) => {
                    if (todo._id === todoId) {
                        // Toggle the isCompleted property
                        return { ...todo, isCompleted: !todo.isCompleted };
                    }
                    return todo;
                });
            });

            return { previousTodos }
        },
        onError(error, newTodoName, context) {
            if (context) {
                queryClient.setQueryData(['todos'], context.previousTodos)
            }
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    })

    return (
        <div>
            <div className='flex justify-between items-center p-4 group'>
                <label className={`custom-checkbox ${isCompleted && 'line-through'} ${isCompleted ? 'text-lightMode-light-grayish-blue dark:text-darkMode-dark-grayish-blue' : 'text-lightMode-very-dark-grayish-blue dark:text-darkMode-light-grayish-blue'} cursor-pointer`}>
                    {name}

                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={async () => {
                            await markTodoMutation(_id)
                        }}
                    />

                    <div className="wrapper group">
                        <span className='checkmark flex justify-center items-center hover:border-none bg-white dark:bg-darkMode-very-dark-desaturated-blue'>
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
                    </div>


                </label>


                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    role="img"
                    aria-label='Delete Todo'
                    className='lg:hidden lg:group-hover:block cursor-pointer'
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