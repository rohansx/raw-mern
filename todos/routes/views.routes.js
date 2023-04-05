const express = require("express")
const utils = require("../utils/utils")

const router = express.Router()

router.get("", (req,res) => {
    return utils.readData()
    .then((dataArr)=>{
    res.render("index",{title:"Home", todos:dataArr})
    })

})


module.exports = router