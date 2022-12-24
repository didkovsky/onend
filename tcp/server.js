const { createServer } = require('net')

createServer(socket => {

  socket.on('error', console.log)

  // Если нет этого обработчика, событие 'end' не сработает, когда клиент закроет сокет
  // socket.on('data', () => {})

  let fromClient = true
  socket.on('end', () => {
    if (fromClient) console.log('End from client.')
    else console.log('End from server.')
  })

  setTimeout(() => {
    fromClient = false
    socket.write('Ok.')
    socket.end()
  }, 2000)
})
.listen(444)
