const express = require("express")
const morgan = require("morgan")
const db = require("./config/dbCofig")
const routes = require("./routes/routes")
const {Server} = require("socket.io")
const http = require('http');
const { dataBaseLength } = require("./querys/querry")

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.port || 8086

db.authenticate().then(() => {
    console.log("Banco de dados ativo")
})

app.use(morgan("dev"))
app.use(routes)

let oldLength = 0
io.on("connection", (socket) => {
    console.log("TV conectada")
    setInterval(async () => {
        const length = await dataBaseLength()        
        if(oldLength < length){
            socket.emit('msg', length)
            oldLength = length
        }
    }, 1000);
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))