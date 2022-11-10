import socket from '../app'

const socketApi = () => {
    socket.io.on('connection', (skt) => { 
        // skt.emit()
    } )
} 
// const io = socket.io()

export default socketApi;