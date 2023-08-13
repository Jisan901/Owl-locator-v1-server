const socket = require('socket.io');



function socketInit(server) {
    const io = socket(server,{
        cors:{
            origin:"*",
        }
    });
    
    
    io.on('connection',(socket)=>{
        socket.on('join_group',(gid)=>{
            socket.join(gid)
            socket.emit("scroll","")
        })
        socket.on('message',(data)=>{
            io.to(data.gid).emit('message',data)
        })
        socket.on('markers',({gid,markers})=>{
            socket.broadcast.to(gid).emit('markers',markers)
        })
    })
    
}
module.exports = socketInit;