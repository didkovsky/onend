const { Socket } = require('net')

const socket = new Socket()
socket.on('error', console.log)
socket.on('end', () => console.log('End.'))
socket.on('close', () => console.log('Close.'))

socket.on('data', data => {
  console.log(data.toString('utf8'))
  /**
   * Пытаемся закрыть сокет, когда получаем пакет,
   * но если на стороне сервера нет обработчика .on('data')
   * данные будут приходить пока сервер сам не закроет сокет.
   */
  socket.end()
})

socket.connect({
  host: 'localhost',
  port: 444
}, () => {
  socket.write('Hello!')
})
