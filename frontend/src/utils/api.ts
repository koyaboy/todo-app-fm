import axios from "axios"

import { TodoProps } from "../components/Todo/Todo.types"

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const getTodos = async (): Promise<Array<TodoProps>> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/todo`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

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

export {
    getTodos,
    deleteTodo,
    markTodo
}