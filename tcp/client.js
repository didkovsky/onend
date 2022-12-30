const { Socket } = require('net')

const socket = new Socket()
socket.on('error', console.log)

// Not emitted, if .on('data') not attached on the server side
socket.on('end', () => console.log('End.'))

// Data will come while server sends it
socket.on('data', data => console.log(data.toString('utf8')))

socket.connect({
  host: 'localhost',
  port: 444
}, () => {
  socket.write('Hello!')
 // Will be ignored
  socket.end()
})
