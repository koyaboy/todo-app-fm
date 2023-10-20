const mongoose = require("mongoose")
const Todo = require("../models/Todo")

//GET ALL TODOS
const getAllTodos = async (req, res) => {
    const todos = await Todo.find()

    res.status(200).json(todos)
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
    getAllTodos,
    addNewTodo,
    deleteTodo,
    markTodo,
    clearCompletedTasks
}