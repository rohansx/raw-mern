const express = require("express")
const fs = require("fs/promises")
const utils = require("./utils/utils.js");
const todoRouter = require("./routes/todos.routes.js");
const viewsRouter = require("./routes/views.routes")

// initialize the express app
const app = express()

// view engine config
// app.use("/assets", express.static("./assets"))
app.set("view engine", "ejs")

// Middleware to handle JSON-encoded request bodies
app.use(express.json());

app.get("/greetings", (req, res) => {
    res.send("Hello, My project started!");
  });

//view router
app.use("/", viewsRouter)

//api router
app.use("/api/v1/todos", todoRouter)

// Function to read the todo data from the file
// function readData() {
//     return fs.readFile("db.json", "utf8")
//         .then(data => JSON.parse(data))
//         .catch(error => {
//             console.error("Failed to read data:", error);
//             throw error;
//         });
// }

// Route to fetch all todos
// app.get("/todos", (req, res) => {
//     readData().then(data => {
//         return res.status(200).json({
//             message: "All todos fetched successfully.",
//             data: data,
//             error: null
//         });
//     }).catch(error => {
//         return res.status(500).json({
//             message: "Failed to fetch todos.",
//             data: null,
//             error: error.message
//         });
//     });
// });

// // Route to create a new todo
// app.post("/todos", (req, res) => {
//     const newTodo = req.body;
    
//     // Validate the input
//     if (!newTodo || !newTodo.title) {
//         return res.status(400).json({
//             message: "Invalid input.",
//             data: null,
//             error: "Todo title is required."
//         });
//     }
    
//     readData().then(data => {
//         // append the new todo to the existing data
//         data.push(newTodo);
//         // write the updated data back to the file
//         return fs.writeFile("db.json", JSON.stringify(data));
//     }).then(() => {
//         // send a response indicating the todo was created successfully
//         return res.status(201).json({
//             message: "Todo created successfully.",
//             data: newTodo
//         });
//     }).catch(error => {
//         // send an error response if there was an issue creating the todo
//         return res.status(500).json({
//             message: "Failed to create todo.",
//             data: null,
//             error: error.message
//         });
//     });
// });

app.listen(3000, () => {
    console.log("server is running on port 3000")
});
