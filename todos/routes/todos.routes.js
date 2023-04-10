const express = require("express")
const fs = require("fs/promises")
const utils = require("../utils/utils")

// calling function express.Router() which is used to channelise all the routers
const todoRouter = express.Router()

// http://localhost:3000/todos
todoRouter.get("/", (req, res)=>{
    return utils.readData()
    .then((data)=> {
        res.status(200).json({
            message: "All todos fetched",
            // data: data,
            data,
            error: null
        })
    })
})
todoRouter.post("/", (req, res) => {
    const newTodo = req.body

    return utils.readData()
    .then((data)=>{
        data.push(newTodo)

        // writing the JSON object after converting it to string
        return fs.writeFile("db.json", JSON.stringify(data))
    })
    .then(()=>{
        return res.status(201).json({
            message: "All todos fetched",
            data: newTodo,
            error: null
        })
    })
})
// colon : means anything can be there in the params for "title"
todoRouter.get("/:title", (req, res) => {
    const title = req.params.title.toLowerCase();
    console.log("param is ", title);

    // return res.send("Got single object")
    return utils.readData()
    .then((dataArr)=>{
        // find() expects a predicate so sending a arrow function
        const todoObj = dataArr.find((todo)=> {
            return todo.title.toLowerCase() === title
        })
        console.log("obj is ---", todoObj);
        return res.status(200).json({
            message: "Todo fetched successfully",
            data: todoObj,
            error: null
        })
    })
})
todoRouter.put("/:title", (req, res) => {
    const title = req.params.title.toLowerCase();
    // console.log("param is ", title);
    const updatedTodo = req.body

    // return res.send("Got single object")
    return utils.readData()
    .then((dataArr)=>{
        // find() expects a predicate so sending a arrow function
        const idx = dataArr.findIndex((todo)=> {
            return todo.title.toLowerCase() === title
        })

        // if idx exists
        if(idx != -1){
            dataArr[idx] = {
                ...dataArr[idx],
                ...updatedTodo
            }
        }
        return fs.writeFile("db.json", JSON.stringify(dataArr))
        // fs.writeFile is promise so it needs to be fulfilled using then block 
        // but because of using return we can fulfill it outside this block too below.
    })
    .then(()=>{
        return res.status(200).json({
            message: "Todo updated successfully",
            data: updatedTodo,
            error: null
        })
    })
})
todoRouter.delete("/:title", (req, res) => {
    const title = req.params.title.toLowerCase();
    let deletedObj

    return utils.readData()
    .then((dataArr)=>{
        // find() expects a predicate so sending a arrow function
        const idx = dataArr.findIndex((todo)=> {
            return todo.title.toLowerCase() === title
        })

        // if idx exists
        if(idx != -1){
            deletedObj = dataArr.splice(idx, 1)
        }

        return fs.writeFile("db.json", JSON.stringify(dataArr))
        // fs.writeFile is promise so it needs to be fulfilled using then block 
        // but because of using return we can fulfill it outside this block too below.
    })
    .then(()=>{
        return res.status(200).json({
            message: "Todo deleted successfully",
            data: deletedObj,
            error: null
        })
    })
})
todoRouter.delete("/deleteMany", (req, res) => {
    const titleArr = req.body
    console.log("title arr is ------", titleArr);
    // return utils.readData()
    // .then((data)=>{

    //     // writing the JSON object after converting it to string
    //     // return fs.writeFile("db.json", JSON.stringify(data))
    // })
    // .then(()=>{
    //     return res.status(201).json({
    //         message: "All todos fetched",
    //         data: newTodo,
    //         error: null
    //     })
    // })
})

// module.exports = {
//     // todoRouter
//     router: todoRouter
// }
module.exports = todoRouter
