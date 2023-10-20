const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.json({ message: "GET ALL TODOS" })
})

router.post("/", (req, res) => {
    res.json({ message: "ADD NEW TODO" })
})

router.delete("/:taskId", (req, res) => {
    res.json({ message: "DELETE A TODO" })
})

router.patch("/:taskId", (req, res) => {
    res.json({ message: "MARK TODO AS COMPLETE" })
})

router.delete("/", (req, res) => {
    res.json({ message: "CLEAR ALL COMPLETED TASKS" })
})

module.exports = router