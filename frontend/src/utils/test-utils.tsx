// // import React, { ReactElement } from 'react'
// // import { render, RenderOptions } from '@testing-library/react'
// // import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// // const queryClient = new QueryClient({
// //   defaultOptions: {
// //     queries: {
// //       // ✅ turns retries off
// //       retry: false,
// //     },
// //   },
// // })


// // const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       {children}
// //     </QueryClientProvider>
// //   )
// // }

// // const customRender = (
// //   ui: ReactElement,
// //   options?: Omit<RenderOptions, 'wrapper'>,
// // ) => render(ui, { wrapper: AllTheProviders, ...options })

// // export * from '@testing-library/react'
// // export { customRender as render }

// import { render } from '@testing-library/react'
// import * as React from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { HttpResponse, http } from 'msw'

// const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// const todos = new Map()

// todos.set("1", { _id: "1", name: 'Task 1', isCompleted: false })
// todos.set("2", { _id: "2", name: 'Task 2', isCompleted: true })

// export const handlers = [

//   http.get(`${BASE_URL}/api/todo`, () => {
//     return HttpResponse.json(Array.from(todos.values()))
//   }),


//   http.delete(`${BASE_URL}/api/todo/:id`, ({ params }) => {
//     const { id } = params

//     const deletedTodo = todos.get(id)

//     if (!deletedTodo) {
//       return new HttpResponse(null, { status: 404 })
//     }

//     todos.delete(id)

//     console.log(todos)

//     return HttpResponse.json(deletedTodo, { status: 200 })
//   }),
// ]

// const createTestQueryClient = () => new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//     },
//   },
// })

// export function renderWithClient(ui: React.ReactElement) {
//   const testQueryClient = createTestQueryClient()
//   const { rerender, ...result } = render(
//     <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
//   )
//   return {
//     ...result,
//     rerender: (rerenderUi: React.ReactElement) =>
//       rerender(
//         <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
//       ),
//   }
// }

// export function createWrapper() {
//   const testQueryClient = createTestQueryClient()
//   return ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
//   )
// }