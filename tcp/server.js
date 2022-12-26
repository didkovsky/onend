const { createServer } = require('net')

createServer(socket => {

  socket.on('error', console.log)

  // Если нет этого обработчика, событие 'end' не сработает, когда клиент закроет сокет
  socket.on('data', () => {})

  socket.on('end', () => console.log('end.'))
  socket.on('close', () => console.log('close.'))

  setTimeout(() => {
    fromClient = false
    socket.write('Ok.')
    socket.end()
  }, 2000)
})
.listen(444)
