const express = require("express")
const cors = require("cors")

const routes = express.Router()

routes.use(cors({}))

routes.get("/",(req,res) => {
    res.status(200).json({msg: "ok", results: "Hello world", status: 200})
})

module.exports = routes