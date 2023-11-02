const express = require("express")

const router = express.Router()

const {
    getTodos, addNewTodo, reorderTodos, deleteTodo, markTodo, clearCompletedTasks
} = require("../controllers/todoControllers")

//GET ALL TODOS
router.get("/:filter", getTodos)

//ADD NEW TODO
router.post("/", addNewTodo)

router.post("/reorder/:filter", reorderTodos)
//DELETE TODO
router.delete("/:taskId", deleteTodo)

//MARK TODO
router.patch("/:taskId", markTodo)

//CLEAR ALL COMPLETED TASKS
router.delete("/", clearCompletedTasks)

module.exports = router