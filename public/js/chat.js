const socket=io()

socket.on('messageUpdate',(messages)=>{
    console.log(messages)
})


document.querySelector('#message-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const message=document.querySelector('input').value

    socket.emit('sendMessage',message)
})

// socket.on('countUpdated',(count)=>{
//     console.log('The count has been updated',count)
// })

// document.querySelector('#btn').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('btn')
// })