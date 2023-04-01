const express = require("express")
const utils = require("../utils/utils")
const fs = require("fs/promises")
const { isTypedArray } = require("util/types")

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
    const title=req.params.title.toLowerCase()
    const updateTodo=req.body
   
    return utils.readData()
        .then((dataArr)=>{
            const todoObj = dataArr.find((todo)=>{
                return todo.title === title
            })

            return res.status(200)
                .json({
                    message:"Todo fetched successfully",
                    data:todoObj,
                    error:null
                })
        })
})

todoRouter.put("/:title", (req,res) => {
    const title = req.params.title.toLowerCase()
    const updateTodo = req.body
   
    return utils.readData()
        .then((dataArr)=>{
            const idx = dataArr.findIndex((todo)=>{
                return todo.title === title
            })

            if(idx!=-1){
                dataArr[idx] = {
                    ...dataArr[idx],
                    ...updateTodo
                }
            }

            return fs.writeFile("db.json", JSON.stringify(dataArr))
        })
        .then(()=>{
            return res.status(200)
            .json({
                message:"Todo updated successfully",
                data:updateTodo,
                error:null
            })
        })
})


todoRouter.delete("/:title", (req, res) => {
    const title = req.params.title.toLowerCase()
    let deletedObj;

    return utils.readData()
        .then((dataArr) => {
            const idx = dataArr.findIndex((todo) => {
                return todo.title === title
            })
            if (idx != -1) {
                deletedObj = dataArr.splice(idx, 1)
            }
            return fs.writeFile("db.json", JSON.stringify(dataArr))
        })
        .then(() => {
            return res.status(200)
                .json({
                    message: "Todo deleted successfully",
                    data: deletedObj
                })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "Error deleting todo",
                data: null,
                error: err
            });
        });
});


// module.exports ={
//     todoRouter
// }

module.exports = todoRouter;
