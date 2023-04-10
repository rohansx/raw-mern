const express = require("express")
const todoRoute = require("./routes/todos.routes")
const viewsRouter = require("./routes/view")
const middlewares = require("./middlewares/index")

// initialize express app
const app = express()

// mounting view engine to get extra capability of using EJS
// setting the view engine of express app to ejs (by default it is HTML)
app.set("view engine", "ejs")

// middlewares

// middleware #1
// making logger
// app.user() having no path "" but has a function
// using a function in it makes it a middleware
app.use(middlewares.logger)

// middleware #2
// **VERY IMP - this is used to collect data from req.body in chunks
// without this the body parsing would be defined in the POST calls
app.use(express.json())

// making a greeting call to check server is running or not
app.get("/greeting", (req, res) => {
    return res.send("Greetings from Todo app.")
})

// VIEWS ROUTERS
app.use("/", viewsRouter)

// API ROUTERS

// THIS IS BASE URL
// http://localhost:3000/todos

// app.use("/todos", todoRoute.router) // if using const todoRoute = require() along with module.exports = { router: todoRouter }
app.use("/api/todos", todoRoute) // if module.exports = todoRouter

app.listen(3000, () => {
    console.log("Todo server is running");
})