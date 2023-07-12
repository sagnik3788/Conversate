const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message =e.target.elements.message.value

    socket.emit('sendMessage', message)
})
document.querySelector('#Send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return  alert('Geolocation not supported by your browswer')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',{
        longitude:position.coords.longitude,
        latitude:position.coords.latitude
        })
    })
})