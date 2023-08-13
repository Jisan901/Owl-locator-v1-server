const express = require("express");
const cookiParser = require("cookie-parser");
const cors = require("cors");
const socket = require('socket.io')

const app = express()


app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())
app.use(cookiParser())


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/untitled.html')
})


const server = app.listen(5000,e=>console.log('Server listening'))

const io = socket(server);


io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('join_room',rid=>{
        socket.join(rid)
        socket.broadcast.emit('message',"user joind")
        socket.broadcast.to(rid).emit("message","user joind s")
        
    })
})

