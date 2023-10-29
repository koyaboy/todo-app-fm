import React, { useState, useEffect, Fragment } from 'react'
import { TodoProps } from '../Todo/Todo.types'
import Todo from '../Todo/Todo'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewTodo, clearCompletedTasks } from '../../utils/api'

const TodoList = ({ todos }: { todos: TodoProps[] }) => {

    const [filter, setFilter] = useState<string>("all")
    const [todoName, setTodoName] = useState<string>("")

    const queryClient = useQueryClient()

    const { mutateAsync: clearCompletedTasksMutation } = useMutation({
        mutationFn: clearCompletedTasks,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const { mutateAsync: addNewTodoMutation } = useMutation({
        mutationFn: addNewTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const filteredTodos =
        todos.filter(todo => {
            switch (filter) {
                case 'all':
                    return true
                case 'completed':
                    return todo.isCompleted
                case 'active':
                    return !todo.isCompleted
            }
        })


    return (
        <main className='relative -top-20 px-4'>
            <div className=' bg-white dark:bg-darkMode-very-dark-desaturated-blue flex gap-4 items-center p-4 rounded-md'>
                <div className='w-5 h-5 rounded-full border border-lightMode-light-grayish-blue'></div>

                <input
                    type="text"
                    placeholder='Create a new todo...'
                    className='bg-transparent text-lightMode-very-dark-grayish-blue dark:text-darkMode-light-grayish-blue'
                    value={todoName}
                    onChange={(e) => setTodoName(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                            await addNewTodoMutation(todoName)
                            setTodoName("")
                        }
                    }}
                />
            </div>

            <ul className='mt-2 bg-white dark:bg-darkMode-very-dark-desaturated-blue rounded-md shadow-xl'>
                {filteredTodos?.map((todo) => (
                    <li key={todo._id}>
                        <Todo
                            _id={todo._id}
                            name={todo.name}
                            isCompleted={todo.isCompleted}
                        />
                    </li>
                ))}

                <div className='flex justify-between p-4 text-lightMode-dark-grayish-blue'>
                    <p>{filteredTodos.length} items left</p>
                    <button onClick={async () => await clearCompletedTasksMutation()}>Clear Completed</button>
                </div>
            </ul>

            <div className='bg-white dark:bg-darkMode-very-dark-desaturated-blue flex justify-center gap-3 mt-4 py-2 shadow-xl rounded-md'>
                <button
                    className={`${filter == "all" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue'} font-bold`}
                    onClick={() => {
                        setFilter("all")
                    }}
                >
                    All
                </button>

                <button
                    className={`${filter == "active" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue'} font-bold`}
                    onClick={() => {
                        setFilter("active")
                    }}
                >
                    Active
                </button>

                <button
                    className={`${filter == "completed" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue'} font-bold`}
                    onClick={() => {
                        setFilter("completed")
                    }}
                >
                    Completed
                </button>
            </div>


        </main>
    )
}

export default TodoList