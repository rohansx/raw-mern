const fs = require("fs/promises")

function readData(){
    return fs.readFile("db.json","utf-8")
    .then((data)=>{
        return JSON.parse(data.toString())
    })
}

module.exports = {
    readData
}