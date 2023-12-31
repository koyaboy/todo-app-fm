import axios from "axios"

import { TodoProps } from "../components/Todo/Todo.types"

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

type reorderTodosParams = {
    filter: string;
    sourceIndex: number;
    destinationIndex: number;
    id: string;
}

const getTodos = async (filter: string): Promise<Array<TodoProps>> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/todo/${filter}`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

const addNewTodo = async (todoName: string): Promise<TodoProps> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/todo/`, { name: todoName })
        return response.data
    } catch (error) {
        throw error
    }
}

// const reorderTodos = async ({ filter, sourceIndex, destinationIndex, id }: reorderTodosParams): Promise<TodoProps[]> => {
//     try {
//         const response = await axios.post(`${BASE_URL}/api/todo/reorder/${filter}`, { sourceIndex, destinationIndex, id })
//         return response.data
//     } catch (error) {
//         throw error
//     }
// }
const deleteTodo = async (id: string): Promise<TodoProps> => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/todo/${id}`)
        return response.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

const markTodo = async (id: string): Promise<TodoProps> => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/todo/${id}`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

const clearCompletedTasks = async (): Promise<{ acknowledged: boolean, deletedCount: number }> => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/todo`)
        return response.data
    } catch (error) {
        throw error
    }
}

export {
    getTodos,
    addNewTodo,
    // reorderTodos,
    deleteTodo,
    markTodo,
    clearCompletedTasks
}