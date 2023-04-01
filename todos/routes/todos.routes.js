const express = require("express")
const utils = require("../utils/utils")
const fs = require("fs/promises")

const todoRouter = express.Router() //Router() function in express

todoRouter.get("/", (req, res) => {
    // return res.send("All todos fetched.")
    return utils.readData()
    .then ((data) => {
        return res.status(200).json({
            message: "All todos feteched",
            data,
            error: null
        })
    })
    
})

todoRouter.post("/", (req,res) => {
    const newTodo = req.body

    return utils.readData()
    .then((data) => {
        data.push(newTodo) //to write
        return fs.writeFile("db.json", JSON.stringify(data))
    })
    .then(() => {
        return res.status (201).json({
            message: "Todo created successfully",
            data: newTodo,
            error: null
    })
    })
})


todoRouter.get("/:title", (req,res) => {
    const title=req.params.title
    console.log("title :", title)
    return res.send("got it")
})



// module.exports ={
//     todoRouter
// }

module.exports = todoRouter
