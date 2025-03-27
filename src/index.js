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

const PORT = process.env.PORT || 8086

db.authenticate().then(() => {
    console.log("Banco de dados ativo")
})

app.use(morgan("dev"))
app.use(routes)

io.on("connection", (socket) => {
    console.log("TV conectada")
    let oldLength = 0
    let timer = 0
    
    let timerMapTable = setInterval(async () => {
        const length = await dataBaseLength()  
        timer += 0.5
        
        if(oldLength < length){
            io.emit('msg', length)
            oldLength = length
            timer = 0
        }else if(timer == 30){
            io.emit('msg', length)
            timer = 0
        }
        console.log(length)
    }, 1000);

    let intervalId = timerMapTable[Symbol.toPrimitive]()
    
    socket.on("disconnect", () => {
        console.log("TV desconectada")
        clearInterval(intervalId)
    })
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))
