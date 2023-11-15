/*
- Should render correctly

- Should delete todo when delete icon is clicked
*/

import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import Todo from "./Todo"
import { renderWithClient } from "../../utils/test-utils"
import { deleteTodo, markTodo } from "../../utils/api"
import { vi } from "vitest"

vi.mock('../../utils/api', () => {
    return {
        deleteTodo: vi.fn().mockResolvedValue(
            { _id: "1", name: "test", isCompleted: false }
        ),
        markTodo: vi.fn().mockResolvedValue({
            _id: "1", name: "test", isCompleted: true
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
                filter="all"
            />
        )

        const checkbox = screen.getByRole("checkbox")
        const task = screen.getByText(todo.name)
        const deleteIcon = screen.getByRole("img")

        expect(checkbox).toBeInTheDocument()
        expect(task).toBeInTheDocument()
        expect(deleteIcon).toBeInTheDocument()
    })

    test("should call deleteTodo with correct arguments and returns deleted Todo", async () => {
        user.setup()

        let todo = { _id: "1", name: "test", isCompleted: false }

        renderWithClient(
            <Todo
                _id={todo._id}
                name={todo.name}
                isCompleted={todo.isCompleted}
                filter="all"
            />
        )

        const deleteIcon = screen.getByRole("img")

        await user.click(deleteIcon)

        expect(deleteTodo).toHaveBeenCalledWith(todo._id)

        const result = await deleteTodo(todo._id);

        expect(result).toEqual(todo);
    })

    test("should call markTodo with correct arguments and change isCompleted", async () => {
        user.setup()

        let todo = { _id: "1", name: "test", isCompleted: false }

        renderWithClient(
            <Todo
                _id={todo._id}
                name={todo.name}
                isCompleted={todo.isCompleted}
                filter="all"
            />
        )

        const checkbox = screen.getByRole("checkbox")

        await user.click(checkbox)

        expect(markTodo).toHaveBeenCalledWith(todo._id)

        const result = await markTodo(todo._id)

        expect(result).toEqual({ _id: "1", name: "test", isCompleted: true })
    })
})