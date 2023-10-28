//Todolist should render an input box and todos

//TodoList should render all todos when all button is clicked

//TodoList should render only active todos when active is clicked

//TodoList should render only completed todos when completed is clicked

import { render, screen } from "@testing-library/react"
import { renderWithClient } from "../../utils/test-utils"
import { vi } from "vitest"
import user from "@testing-library/user-event"
import TodoList from "./TodoList"
import { clearCompletedTasks } from "../../utils/api"

vi.mock('../../utils/api', () => {
    return {
        deleteTodo: vi.fn().mockResolvedValue(
            { _id: "1", name: "test", isCompleted: false }
        ),
        markTodo: vi.fn().mockResolvedValue({
            _id: "1", name: "test", isCompleted: true
        }),
        clearCompletedTasks: vi.fn().mockResolvedValue({
            acknowledged: true, deletedCount: 2
        })
    };
});

describe("TodoList", () => {
    test('renders correctly', () => {
        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test 2", isCompleted: true },
            { _id: "3", name: "test 3", isCompleted: false }
        ]
        renderWithClient(<TodoList todos={todos} />)

        const addTodoElement = screen.getByRole("textbox")
        expect(addTodoElement).toBeInTheDocument()

        const todo1 = screen.getByText('test 1')
        const todo2 = screen.getByText('test 2')
        const todo3 = screen.getByText('test 3')

        expect(todo1).toBeInTheDocument()
        expect(todo2).toBeInTheDocument()
        expect(todo3).toBeInTheDocument()


        const itemsLeftElement = screen.getByText(`${todos.length} items left`)

        const clearCompletedButton = screen.getByRole("button", {
            name: "Clear Completed"
        })

        expect(itemsLeftElement).toBeInTheDocument()
        expect(clearCompletedButton).toBeInTheDocument()

        const allTodos = screen.getByRole("button", {
            name: "All"
        })

        const activeTodos = screen.getByRole("button", {
            name: "Active"
        })

        const completedTodos = screen.getByRole("button", {
            name: "Completed"
        })

        expect(allTodos).toBeInTheDocument()
        expect(activeTodos).toBeInTheDocument()
        expect(completedTodos).toBeInTheDocument()
    })

    test("clearCompletedTasks function should return correct deletedCount", async () => {
        user.setup()

        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test2", isCompleted: true },
            { _id: "3", name: "test3", isCompleted: true }
        ]

        let completed = 0

        for (const todo of todos) {
            if (todo.isCompleted === true) {
                completed += 1
            }
        }

        renderWithClient(
            <>
                <TodoList todos={todos} />
            </>
        )

        const clearCompletedButton = screen.getByRole("button", {
            name: "Clear Completed"
        })

        await user.click(clearCompletedButton)

        expect(clearCompletedTasks).toHaveBeenCalled()

        const result = await clearCompletedTasks()

        expect(result).toEqual({
            acknowledged: true,
            deletedCount: completed
        })
    })

    test('displays all todos when All button is clicked', async () => {
        user.setup()

        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test2", isCompleted: true },
            { _id: "3", name: "test3", isCompleted: true },
            { _id: "4", name: "test4", isCompleted: false },
            { _id: "5", name: "test5", isCompleted: true }
        ]

        renderWithClient(
            <>
                <TodoList todos={todos} />
            </>
        )

        const allTodosButton = screen.getByRole('button', {
            name: "All"
        })

        await user.click(allTodosButton)

        const todoComponents = screen.getAllByRole("listitem")

        expect(todoComponents).toHaveLength(todos.length)
    })

    test('displays active todos when Active button is clicked', async () => {
        user.setup()

        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test2", isCompleted: true },
            { _id: "3", name: "test3", isCompleted: true },
            { _id: "4", name: "test4", isCompleted: false },
            { _id: "5", name: "test5", isCompleted: true }
        ]

        renderWithClient(
            <>
                <TodoList todos={todos} />
            </>
        )

        const activeTodosButton = screen.getByRole('button', {
            name: "Active"
        })

        await user.click(activeTodosButton)

        const activeTodos = todos.filter((todo) => !todo.isCompleted)

        const todoComponents = screen.getAllByRole("listitem")

        expect(todoComponents).toHaveLength(activeTodos.length)
    })

    test('displays completed todos when Completed button is clicked', async () => {
        user.setup()

        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test2", isCompleted: true },
            { _id: "3", name: "test3", isCompleted: true },
            { _id: "4", name: "test4", isCompleted: false },
            { _id: "5", name: "test5", isCompleted: true }
        ]

        renderWithClient(
            <>
                <TodoList todos={todos} />
            </>
        )

        const completedTodosButton = screen.getByRole('button', {
            name: "Completed"
        })

        await user.click(completedTodosButton)

        const completedTodos = todos.filter((todo) => todo.isCompleted)

        const todoComponents = screen.getAllByRole("listitem")

        expect(todoComponents).toHaveLength(completedTodos.length)
    })
})

