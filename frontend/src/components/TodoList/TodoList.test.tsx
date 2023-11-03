// //Todolist should render an input box and todos

// //TodoList should render all todos when all button is clicked

// //TodoList should render only active todos when active is clicked

// //TodoList should render only completed todos when completed is clicked

import { render, screen } from "@testing-library/react"
import { renderWithClient } from "../../utils/test-utils"
import { vi } from "vitest"
import user from "@testing-library/user-event"
import TodoList from "./TodoList"
import Todo from "../Todo/Todo"
import { clearCompletedTasks, addNewTodo } from "../../utils/api"

// vi.mock('../../utils/api', () => {
//     return {
//         deleteTodo: vi.fn().mockResolvedValue(
//             { _id: "1", name: "test", isCompleted: false }
//         ),
//         markTodo: vi.fn().mockResolvedValue({
//             _id: "1", name: "test", isCompleted: true
//         }),
//         clearCompletedTasks: vi.fn().mockResolvedValue({
//             acknowledged: true, deletedCount: 2
//         }),
//         addNewTodo: vi.fn().mockResolvedValue({
//             _id: "1", name: "test", isCompleted: false
//         })
//     };
// });

// describe("TodoList", () => {
//     test('renders correctly', () => {

//         let todo = { _id: "1", name: "test 1", isCompleted: false }
//         renderWithClient(
//             <>
//                 <TodoList />
//                 <Todo _id={todo._id} name={todo.name} isCompleted={todo.isCompleted} />
//             </>
//         )

//         const addTodoElement = screen.getByRole("textbox")
//         expect(addTodoElement).toBeInTheDocument()

//         const todo1 = screen.getByText('test 1')

//         expect(todo1).toBeInTheDocument()

//         const itemsLeftElement = screen.getByText(/0 items left/i)

//         const clearCompletedButton = screen.getByRole("button", {
//             name: "Clear Completed"
//         })

//         expect(itemsLeftElement).toBeInTheDocument()
//         expect(clearCompletedButton).toBeInTheDocument()

//         const allTodosButton = screen.getByTestId("mobile-all")
//         const activeTodosButton = screen.getByTestId("mobile-active")
//         const completedTodosButton = screen.getByTestId("mobile-completed")

//         expect(allTodosButton).toBeInTheDocument()
//         expect(activeTodosButton).toBeInTheDocument()
//         expect(completedTodosButton).toBeInTheDocument()
//     })

//     test("should call addNewTodo function with correct arguments", async () => {
//         user.setup()

//         let todos = [
//             { _id: "1", name: "test 1", isCompleted: false },
//             { _id: "2", name: "test 2", isCompleted: true },
//             { _id: "3", name: "test 3", isCompleted: false }
//         ]

//         renderWithClient(<TodoList />)

//         const todoName = "test"

//         const todoInput = screen.getByRole("textbox")

//         await user.type(todoInput, todoName)

//         await user.type(todoInput, '{enter}')

//         expect(addNewTodo).toHaveBeenCalledWith(todoName)
//     })

//     test("clearCompletedTasks function should return correct deletedCount", async () => {
//         user.setup()

//         let todos = [
//             { _id: "1", name: "test 1", isCompleted: false },
//             { _id: "2", name: "test2", isCompleted: true },
//             { _id: "3", name: "test3", isCompleted: true }
//         ]

//         let completed = 0

//         for (const todo of todos) {
//             if (todo.isCompleted === true) {
//                 completed += 1
//             }
//         }

//         renderWithClient(
//             <>
//                 <TodoList />
//             </>
//         )

//         const clearCompletedButton = screen.getByRole("button", {
//             name: "Clear Completed"
//         })

//         await user.click(clearCompletedButton)

//         expect(clearCompletedTasks).toHaveBeenCalled()

//         const result = await clearCompletedTasks()

//         expect(result).toEqual({
//             acknowledged: true,
//             deletedCount: completed
//         })
//     })

//     test('displays all todos when All button is clicked', async () => {
//         user.setup()

//         let todos = [
//             { _id: "1", name: "test 1", isCompleted: false },
//             { _id: "2", name: "test2", isCompleted: true },
//             { _id: "3", name: "test3", isCompleted: true }
//         ]

//         let todo = { _id: "1", name: "test 1", isCompleted: false }
//         let todo2 = { _id: "2", name: "test2", isCompleted: true }
//         let todo3 = { _id: "3", name: "test3", isCompleted: true }

//         renderWithClient(
//             <>
//                 <TodoList />
//                 <Todo _id={todo._id} name={todo.name} isCompleted={todo.isCompleted} />
//                 <Todo _id={todo2._id} name={todo2.name} isCompleted={todo2.isCompleted} />
//                 <Todo _id={todo3._id} name={todo3.name} isCompleted={todo3.isCompleted} />
//             </>
//         )

//         const allTodosButton = screen.getByTestId('mobile-all')

//         await user.click(allTodosButton)

//         const todoComponents = await screen.findAllByRole("listitem")

//         expect(todoComponents).toHaveLength(todos.length)
//     })

//     // test('displays active todos when Active button is clicked', async () => {
//     //     user.setup()

//     //     let todos = [
//     //         { _id: "1", name: "test 1", isCompleted: false },
//     //         { _id: "2", name: "test2", isCompleted: true },
//     //         { _id: "3", name: "test3", isCompleted: true },
//     //         { _id: "4", name: "test4", isCompleted: false },
//     //         { _id: "5", name: "test5", isCompleted: true }
//     //     ]

//     //     let todo = { _id: "1", name: "test 1", isCompleted: false }
//     //     let todo2 = { _id: "2", name: "test2", isCompleted: true }
//     //     let todo3 = { _id: "3", name: "test3", isCompleted: true }

//     //     renderWithClient(
//     //         <>
//     //             <TodoList />
//     //             <Todo _id={todo._id} name={todo.name} isCompleted={todo.isCompleted} />
//     //             <Todo _id={todo2._id} name={todo2.name} isCompleted={todo2.isCompleted} />
//     //             <Todo _id={todo3._id} name={todo3.name} isCompleted={todo3.isCompleted} />
//     //         </>
//     //     )

//     //     const activeTodosButton = screen.getByTestId("mobile-active")

//     //     await user.click(activeTodosButton)

//     //     const activeTodos = todos.filter((todo) => !todo.isCompleted)

//     //     const todoComponents = screen.getAllByRole("listitem")

//     //     expect(todoComponents).toHaveLength(activeTodos.length)
//     // })

//     // test('displays completed todos when Completed button is clicked', async () => {
//     //     user.setup()

//     //     let todos = [
//     //         { _id: "1", name: "test 1", isCompleted: false },
//     //         { _id: "2", name: "test2", isCompleted: true },
//     //         { _id: "3", name: "test3", isCompleted: true },
//     //         { _id: "4", name: "test4", isCompleted: false },
//     //         { _id: "5", name: "test5", isCompleted: true }
//     //     ]

//     //     let todo = { _id: "1", name: "test 1", isCompleted: false }
//     //     let todo2 = { _id: "2", name: "test2", isCompleted: true }
//     //     let todo3 = { _id: "3", name: "test3", isCompleted: true }

//     //     renderWithClient(
//     //         <>
//     //             <TodoList />
//     //             <Todo _id={todo._id} name={todo.name} isCompleted={todo.isCompleted} />
//     //             <Todo _id={todo2._id} name={todo2.name} isCompleted={todo2.isCompleted} />
//     //             <Todo _id={todo3._id} name={todo3.name} isCompleted={todo3.isCompleted} />
//     //         </>
//     //     )

//     //     const completedTodosButton = screen.getByTestId("mobile-completed")

//     //     await user.click(completedTodosButton)

//     //     const completedTodos = todos.filter((todo) => todo.isCompleted)

//     //     const todoComponents = screen.getAllByRole("listitem")

//     //     expect(todoComponents).toHaveLength(completedTodos.length)
//     // })
// })

