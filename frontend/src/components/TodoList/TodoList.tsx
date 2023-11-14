import React, { useState } from 'react'
import { TodoProps } from '../Todo/Todo.types'
import { DragDropContext, DropResult, Droppable, Draggable } from "@hello-pangea/dnd"
import Todo from '../Todo/Todo'
import LoadingScreen from '../LoadingScreen'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addNewTodo, clearCompletedTasks, getTodos } from '../../utils/api'


const TodoList = () => {

    const [filter, setFilter] = useState<string>("all")
    const [todoName, setTodoName] = useState<string>("")

    const queryClient = useQueryClient()

    const { data: todos = [], isLoading } = useQuery({
        queryFn: () => getTodos(filter),
        queryKey: ['todos', { filter }],
    })

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

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let previousTodos = queryClient.getQueryData(['todos', { filter }]) as TodoProps[]

        let reorderedTodos = previousTodos

        const [removedTodo] = reorderedTodos.splice(source.index, 1)
        reorderedTodos.splice(destination.index, 0, removedTodo)

        queryClient.setQueryData(['todos', { filter }], reorderedTodos)
    }

    return (
        <>
            {isLoading ? (
                <div><LoadingScreen /></div>
            ) : (
                <>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <main className='relative -top-24 px-4 min-[450px]:px-8 sm:px-16 md:px-28 lg:px-44 xl:px-72'>
                            <div className=' bg-white dark:bg-darkMode-very-dark-desaturated-blue flex gap-4 items-center p-4 rounded-md'>
                                <div className='w-5 h-5 rounded-full border border-lightMode-light-grayish-blue'></div>
                                <input
                                    type="text"
                                    placeholder='Create a new todo...'
                                    className='bg-transparent outline-none caret-primary-bright-blue text-lightMode-very-dark-grayish-blue dark:text-darkMode-light-grayish-blue'
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
                            <Droppable droppableId='todoList'>
                                {(provided) => (
                                    <ul
                                        className='mt-2 bg-white dark:bg-darkMode-very-dark-desaturated-blue rounded-md shadow-xl'
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {todos.map((todo, index) => (
                                            <Draggable draggableId={todo._id} key={todo._id} index={index}>
                                                {(provided) => (
                                                    <li
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className='bg-white dark:bg-darkMode-very-dark-desaturated-blue'
                                                    >
                                                        <Todo
                                                            _id={todo._id}
                                                            name={todo.name}
                                                            isCompleted={todo.isCompleted}
                                                        />
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                            <div className=' bg-white dark:bg-darkMode-very-dark-desaturated-blue rounded-b-md shadow-xl flex justify-between p-4 text-lightMode-dark-grayish-blue'>
                                <p>{todos.length} items left</p>

                                <div className='hidden lg:flex lg:justify-center lg:gap-3'>
                                    <button
                                        className={`${filter == "all" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("all")
                                        }}
                                    >
                                        All
                                    </button>

                                    <button
                                        className={`${filter == "active" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("active")
                                        }}
                                    >
                                        Active
                                    </button>

                                    <button
                                        className={`${filter == "completed" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("completed")
                                        }}
                                    >
                                        Completed
                                    </button>
                                </div>

                                <button
                                    className='hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'
                                    onClick={async () => await clearCompletedTasksMutation()}
                                >
                                    Clear Completed
                                </button>
                            </div>

                            <div className='lg:hidden'>
                                <div className='bg-white dark:bg-darkMode-very-dark-desaturated-blue flex justify-center gap-3 mt-4 py-2 shadow-xl rounded-md'>
                                    <button
                                        data-testid="mobile-all"
                                        className={`${filter == "all" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("all")
                                        }}
                                    >
                                        All
                                    </button>

                                    <button
                                        data-testid="mobile-active"
                                        className={`${filter == "active" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("active")
                                        }}
                                    >
                                        Active
                                    </button>

                                    <button
                                        data-testid="mobile-completed"
                                        className={`${filter == "completed" ? 'text-primary-bright-blue' : 'text-lightMode-dark-grayish-blue hover:text-lightMode-very-dark-grayish-blue dark:hover:text-darkMode-light-grayish-blue'} font-bold`}
                                        onClick={() => {
                                            setFilter("completed")
                                        }}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        </main>
                    </DragDropContext>

                    <footer className='text-lightMode-dark-grayish-blue mx-auto w-80% md:w-[50%] flex justify-center -mt-20 py-9'>
                        Drag and drop to reorder list
                    </footer>
                </>
            )}
        </>
    );

}

export default TodoList