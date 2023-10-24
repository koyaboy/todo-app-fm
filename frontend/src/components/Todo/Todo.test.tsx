
/*
- Should render correctly

- Should delete todo when delete icon is clicked
*/
import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import '@testing-library/jest-dom'
import { renderWithClient } from "../../utils/test-utils"
import { deleteTodo } from "../../utils/api"
import Todo from "./Todo"
import { vi } from "vitest"

vi.mock('../../utils/api', () => {
    return {
        deleteTodo: vi.fn().mockResolvedValue({
            message: 'Todo deleted successfully',
        }),
    };
});

describe("Todo", () => {
    test("renders correctly", () => {

        let todo = { _id: "1", name: "test", isCompleted: true }

        renderWithClient(
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
        user.setup()

        let todo = { _id: "1", name: "test", isCompleted: true }

        renderWithClient(
            <Todo
                _id={todo._id}
                name={todo.name}
                isCompleted={todo.isCompleted}
            />
        )

        const deleteIcon = screen.getByRole("img")

        await user.click(deleteIcon)

        expect(deleteTodo).toHaveBeenCalledWith(todo._id)
    })
})