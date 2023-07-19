
const socket = io()
//Elements
const $messageform=document.querySelector('#message-form')
const $messageformInput= document.querySelector('input')
const $messageformButton=document.querySelector('button')
const $messages=document.querySelector('#messages')
const $sendlocationButton=document.querySelector('#Send-location')

//Templates
const messageTemplate=document.querySelector('#message-template').innerHTML
const locationMessageTemplate=document.querySelector('#location-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html=Mustache.render(messageTemplate,{
        message
    })
    $messages.insertAdjacentHTML('beforeend',html)

})
socket.on('locationMessage',(url)=>{
    console.log(url)
    const html=Mustache.render(locationMessageTemplate,{
        url
    })
    $messages.insertAdjacentHTML('beforeend',html)
})
$messageform.addEventListener('submit', (e) => {
    e.preventDefault()
    
  
    $messageformButton.setAttribute('disabled','disabled')
//disable
    const message =e.target.elements.message.value

    socket.emit('sendMessage', message,(error)=>{
        $messageformButton.removeAttribute('disabled')
        $messageformInput.value=""
        $messageformInput.focus()
       
        //enable
        if(error){
            console.log(error)
        }
        console.log('Message delivered')
    })

})
$sendlocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return  alert('Geolocation not supported by your browswer')
    }
    $sendlocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',{
        longitude:position.coords.longitude,
        latitude:position.coords.latitude
        },()=>{
            $sendlocationButton.removeAttribute('disabled')
            console.log('Location shared')
        })
    })
})