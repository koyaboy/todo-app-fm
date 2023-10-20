require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const todoRoutes = require("./routes/todos")

const app = express()

app.use(express.json())

app.use("/api/todo", todoRoutes)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and Listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })


