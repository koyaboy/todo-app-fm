const mongoose = require("mongoose")
const Todo = require("../models/Todo")

//GET ALL TODOS
const getTodos = async (req, res) => {

    const { filter } = req.params

    if (filter == "active") {
        const todos = await Todo.find({ isCompleted: false })
        res.status(200).json(todos)
    }
    else if (filter == "completed") {
        const todos = await Todo.find({ isCompleted: true })
        res.status(200).json(todos)
    }

    else {
        const todos = await Todo.find()
        res.status(200).json(todos)
    }

}

//ADD NEW TODO
const addNewTodo = async (req, res) => {
    const { name } = req.body

    const isCompleted = false

    const todo = {
        name,
        isCompleted
    }

    try {
        await Todo.create(todo)
        res.status(200).json(todo)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//REORDER TODOS
const reorderTodos = async (req, res) => {
    // const { sourceIndex, destinationIndex, id } = req.body

    // const { filter } = req.params

    // try {
    //     if (filter == "active") {
    //         const todos = await Todo.find({ isCompleted: false });

    //         // let sourceName = todos[sourceIndex].name
    //         // let sourceIsCompleted = todos[sourceIndex].isCompleted

    //         // let destName = todos[destinationIndex].name
    //         // let destIsCompleted = todos[destinationIndex].isCompleted

    //         // await Todo.updateOne(
    //         //     { _id: todos[sourceIndex]._id },
    //         //     {
    //         //         $set: {
    //         //             name: destName,
    //         //             isCompleted: destIsCompleted
    //         //         }
    //         //     }
    //         // )

    //         // await Todo.updateOne(
    //         //     { _id: todos[destinationIndex]._id },
    //         //     {
    //         //         $set: {
    //         //             name: sourceName,
    //         //             isCompleted: sourceIsCompleted
    //         //         }
    //         //     }
    //         // )

    //         // const updatedTodos = await Todo.find({ isCompleted: false });
    //         // res.status(200).json(updatedTodos)
    //     }

    //     else if (filter == "completed") {
    //         const todos = await Todo.find({ isCompleted: true });

    //         let sourceName = todos[sourceIndex].name
    //         let sourceIsCompleted = todos[sourceIndex].isCompleted

    //         let destName = todos[destinationIndex].name
    //         let destIsCompleted = todos[destinationIndex].isCompleted

    //         await Todo.updateOne(
    //             { _id: todos[sourceIndex]._id },
    //             {
    //                 $set: {
    //                     name: destName,
    //                     isCompleted: destIsCompleted
    //                 }
    //             }
    //         )

    //         await Todo.updateOne(
    //             { _id: todos[destinationIndex]._id },
    //             {
    //                 $set: {
    //                     name: sourceName,
    //                     isCompleted: sourceIsCompleted
    //                 }
    //             }
    //         )

    //         const updatedTodos = await Todo.find({ isCompleted: true });

    //         res.status(200).json(updatedTodos)
    //     }

    //     else {
    //         const todos = await Todo.find();

    //         let sourceName = todos[sourceIndex].name
    //         let sourceIsCompleted = todos[sourceIndex].isCompleted

    //         let destName = todos[destinationIndex].name
    //         let destIsCompleted = todos[destinationIndex].isCompleted

    //         await Todo.updateOne(
    //             { _id: todos[sourceIndex]._id },
    //             {
    //                 $set: {
    //                     name: destName,
    //                     isCompleted: destIsCompleted
    //                 }
    //             }
    //         )

    //         await Todo.updateOne(
    //             { _id: todos[destinationIndex]._id },
    //             {
    //                 $set: {
    //                     name: sourceName,
    //                     isCompleted: sourceIsCompleted
    //                 }
    //             }
    //         )

    //         const updatedTodos = await Todo.find();

    //         res.status(200).json(updatedTodos)
    //     }
    // }
    // catch (error) {
    //     res.status(500).json({ error: error.message })
    // }

}

//DELETE A TODO
const deleteTodo = async (req, res) => {
    const { taskId } = req.params

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(404).json({ error: "TODO DOES NOT EXIST" })
    }

    const todo = await Todo.findByIdAndDelete({ _id: taskId })

    if (!todo) {
        return res.status(404).json({ message: "TODO DOES NOT EXIST" })
    }

    res.status(200).json(todo)
}

//MARK A TODO AS COMPLETE OR INCOMPLETE
const markTodo = async (req, res) => {
    const { taskId } = req.params

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(404).json({ error: "TODO DOES NOT EXIST" })
    }

    try {
        const todo = await Todo.findById({ _id: taskId })

        todo.isCompleted = !todo.isCompleted

        await todo.save()

        res.status(200).json(todo)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

//CLEAR ALL COMPLETED TASKS
const clearCompletedTasks = async (req, res) => {
    try {
        const todo = await Todo.deleteMany({ isCompleted: true })

        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTodos,
    addNewTodo,
    reorderTodos,
    deleteTodo,
    markTodo,
    clearCompletedTasks
}