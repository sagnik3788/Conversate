const express= require('express')
const http =require('http')
const socketio = require('socket.io')
const path =require('path')

const app=express()
const server =http.createServer(app)
const io=socketio(server)


const port =process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

// let count =0

//server(emit)=>client (recived) - countUpdated
//client(emit)=>server(recived) - btn

io.on('connection',(socket)=>{
console.log('New websocket connection')

socket.emit('messageUpdate','Weclome to the server')

socket.on('sendMessage',(message)=>{
  io.emit('message',message)
})

//emit- send data to client
// socket.emit('countUpdated',count)

// socket.on('btn',()=>{
//      count++
//    //socket.emit('countUpdated',count)
//    io.emit('countUpdated',count)
// })
 })

server.listen(port,()=>{
    console.log('server is up on the port ')
})
