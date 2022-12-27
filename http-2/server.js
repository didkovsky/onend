const { createServer } = require('http')

const server = createServer((req, res) => {
  console.log('Request.')
  req.on('error', console.log)
  req.on('end', () => console.log('End.'))
  req.on('close', () => console.log('Close.'))

  req.on('data', data => {
    console.log(data.toString('utf8'))
    res.write('Ok.')

    /**
     * Не закрывает сокет,
     * данные будут приходить пока клиент их будет отправлять
     */
    res.end()

    // Закроет сокет
    // res.socket.end()
    // или
    // res.destroy()
  })
})

/**
 * Также, сокет не освобождается из пулла
 * при maxConnections = 1 второй клиент
 * не сможет подключиться.
 */
server.maxConnections = 1
server.listen(333)
