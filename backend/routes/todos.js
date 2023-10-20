const express = require("express")

const router = express.Router()

const {
    getAllTodos, addNewTodo, deleteTodo, markTodo, clearCompletedTasks
} = require("../controllers/todoControllers")

//GET ALL TODOS
router.get("/", getAllTodos)

//ADD NEW TODO
router.post("/", addNewTodo)

//DELETE TODO
router.delete("/:taskId", deleteTodo)

//MARK TODO
router.patch("/:taskId", markTodo)

//CLEAR ALL COMPLETED TASKS
router.delete("/", clearCompletedTasks)

module.exports = router