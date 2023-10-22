import axios from "axios"

import { TodoProps } from "../components/Todo/Todo.types"

const BASE_URL = process.env.REACT_APP_BASE_URL

const getTodos = async (): Promise<Array<TodoProps>> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/todo`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

const deleteTodo = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/todo/${id}`)
        console.log(response.data)
        return response.data
    }
    catch (error) {
        throw error
    }
}


export {
    getTodos,
    deleteTodo
}