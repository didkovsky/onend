const { createServer } = require('net')

createServer(socket => {

  socket.on('error', console.log)

  // Если нет этого обработчика, клиент не сможет завершить сокет.
  // socket.on('data', () => {})
  
  socket.on('end', () => console.log('end.'))
  socket.on('close', () => console.log('close.'))

  setTimeout(() => {
    // socket.end()
  }, 2000)

  setInterval(() => {
    socket.write('Data.')
  }, 500)
})
.listen(444)
