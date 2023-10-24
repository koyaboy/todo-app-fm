import '@testing-library/jest-dom'
import { render, screen, waitFor } from "@testing-library/react"
import Todo from "./Todo"

describe("Todo", () => {
    test("renders correctly", () => {

        let todo = { _id: "1", name: "test", isCompleted: true }

        render(
            <Todo
                _id={todo._id}
                name={todo.name}
                isCompleted={todo.isCompleted}
            />
        )

        const checkbox = screen.getByRole("checkbox")
        const task = screen.getByText(todo.name)
        const deleteIcon = screen.getByRole("img")

        expect(checkbox).toBeInTheDocument()
        expect(task).toBeInTheDocument()
        expect(deleteIcon).toBeInTheDocument()
    })
})