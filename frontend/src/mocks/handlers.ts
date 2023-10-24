// import { HttpResponse, http } from 'msw'

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// const todos = new Map()

// todos.set("1", { _id: "1", name: 'Task 1', isCompleted: false })
// todos.set("2", { _id: "2", name: 'Task 2', isCompleted: true })

// export const handlers = [

//     http.get(`${BASE_URL}/api/todo`, () => {
//         return HttpResponse.json(Array.from(todos.values()))
//     }),


//     http.delete(`${BASE_URL}/api/todo/:id`, ({ params }) => {
//         const { id } = params

//         const deletedTodo = todos.get(id)

//         if (!deletedTodo) {
//             return new HttpResponse(null, { status: 404 })
//         }

//         todos.delete(id)

//         console.log(todos)

//         return HttpResponse.json(deletedTodo)
//     }),
// ]