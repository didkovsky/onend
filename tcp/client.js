const { Socket } = require('net')

const socket = new Socket()
socket.on('error', console.log)

// Data will come while server it sends
socket.on('data', data => console.log(data.toString('utf8')))

socket.connect({
  host: 'localhost',
  port: 444
}, () => {
  socket.write('Hello!')
  // Doesn't close
  socket.end()
})
