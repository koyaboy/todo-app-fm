<<<<<<< Updated upstream
/*
- Should render correctly

- Should delete todo when delete icon is clicked
*/

import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
=======
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
>>>>>>> Stashed changes
import Todo from "./Todo"
import user from '@testing-library/user-event';
import { renderWithClient } from '../../utils/test-utils';
import { deleteTodo } from '../../utils/api';
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

<<<<<<< Updated upstream
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
=======
    test("should delete todo when delete icon is clicked", async () => {
        user.setup()
        const todo = { _id: "1", name: "Task 1", isCompleted: false }

        renderWithClient(<Todo _id={todo._id} name={todo.name} isCompleted={todo.isCompleted} />)

        const deleteIcon = screen.getByLabelText('Delete Todo');

        await user.click(deleteIcon)

        expect(deleteTodo).toHaveBeenCalledWith(todo._id)
>>>>>>> Stashed changes

    })
})