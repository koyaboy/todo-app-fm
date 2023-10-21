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


export {
    getTodos
}