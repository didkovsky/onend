## HTTP issue 2

Server cannot close connection through res.end().

Server <a href="https://github.com/didkovsky/onend/tree/main/http-2/server.js">source</a>
``` javascript
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
     * Will not close a socket,
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
 * Also, socket will not release.
 */
server.maxConnections = 1
server.listen(333)

```

Clien <a href="https://github.com/didkovsky/onend/tree/main/http-2/client.js">source</a>
``` javascript
const { request } = require('http')

const options = {
  host: 'localhost',
  port: 333,
  method: 'POST',
  path: '/'
}

const req = request(options, response => {
  response.on('error', console.log)
  response.on('data', data => console.log(data.toString('utf8')))
  response.on('end', () => console.log('End.'))
})

req.on('error', console.log)

setInterval(() => {
  req.write('Hello.')
}, 1000)

// Missing end
// req.end()

```