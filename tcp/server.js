const { createServer } = require('net')

createServer(socket => {

  socket.on('error', console.log)
  
  // Not emitted
  socket.on('end', () => console.log('end.'))
  socket.on('close', () => console.log('close.'))

  /**
   * If listener .on('data') not defined,
   * socket will ignore 'end' signal from client
   */
  // socket.on('data', () => {})

  setTimeout(() => {
    // Missing end
    // socket.end()
  }, 2000)

  setInterval(() => {
    socket.write('Data.')
  }, 500)
})
.listen(444)