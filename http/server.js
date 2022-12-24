const { createServer } = require('http')

createServer((req, res) => {
  console.log('Request.')
  req.on('error', console.log)

  // Если нет этого обработчика, событие 'end' не сработает, когда клиент закроет сокет
  // req.on('data', () => {})

  let fromClient = true
  req.on('end', () => {
    if (fromClient) console.log('End from client.')
    else console.log('End from server.')
  })

  setTimeout(() => {
    fromClient = false
    res.end('Ok.')
  }, 2000)
})
.listen(333)
