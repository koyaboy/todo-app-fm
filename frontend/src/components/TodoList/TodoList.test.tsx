//Todolist should render an input box and todos

import { render, screen } from "@testing-library/react"
import TodoList from "./TodoList"

describe("TodoList", () => {

    test('renders input box and todos', () => {
        let todos = [
            { _id: "1", name: "test 1", isCompleted: false },
            { _id: "2", name: "test 2", isCompleted: true },
            { _id: "3", name: "test 3", isCompleted: false }
        ]
        render(<TodoList todos={todos} />)

        const addTodoElement = screen.getByRole("textbox")
        expect(addTodoElement).toBeInTheDocument()

        const todo1 = screen.getByText('test 1')
        const todo2 = screen.getByText('test 2')
        const todo3 = screen.getByText('test 3')

        expect(todo1).toBeInTheDocument()
        expect(todo2).toBeInTheDocument()
        expect(todo3).toBeInTheDocument()
    })
})

