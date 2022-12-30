const { createServer } = require('http')

const server = createServer((req, res) => {
  console.log('Request.')
  req.on('error', console.log)

  // Not emitted
  req.on('end', () => console.log('End.'))
  req.on('close', () => console.log('Close.'))

  req.on('data', data => {
    console.log(data.toString('utf8'))
    res.write('Ok.')

    /**
     * Will be ignored,
     * data will come while client sends it.
     */
    res.end()

    // Will close a socket.
    // res.socket.end()
    // or
    // res.destroy()
  })
})

/**
 * Also, a socket will not release.
 */
server.maxConnections = 1
server.listen(333)