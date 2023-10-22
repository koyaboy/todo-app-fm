/*
- Should render correctly

- Should delete todo when delete icon is clicked
*/

import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
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

    test("todo deletes when delete icon is clicked", async () => {
        await user.setup()

        let todo = { _id: "1", name: "test", isCompleted: true }

        render(
            <Todo
                _id={todo._id}
                name={todo.name}
                isCompleted={todo.isCompleted}
            />
        )

        const deleteIcon = screen.getByRole("img")

        await user.click(deleteIcon)

        const todoComponent = screen.queryByTestId(todo._id)

        expect(todoComponent).not.toBeInTheDocument();

    })
})