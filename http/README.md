## HTTP issue 1

This issue sequence of <a href="https://github.com/didkovsky/onend/tree/main/tcp/README.md">TCP issue</a>. If we have not listener .on('data') on req object, client cannot close connection.

Server <a href="https://github.com/didkovsky/onend/tree/main/http/server.js">source</a>
``` javascript
const { createServer } = require('http')

createServer((req, res) => {
  console.log('Request.')
  req.on('error', console.log)
  req.on('end', () => console.log('End.'))

  /**
   * If listener .on('data') not defined,
   * client cannot close socket
   */
  // req.on('data', () => {})

  const dataInt = setInterval(() => {
    res.write('Data.')
  }, 1000)

  setTimeout(() => { 
    clearInterval(dataInt)
    res.end('Ok.')
  }, 10000)
})
.listen(333)

```
Client <a href="https://github.com/didkovsky/onend/tree/main/http/client.js">source</a>
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

  // Data will come while server it sends
  response.on('data', data => console.log(data.toString('utf8')))
  response.on('end', () => console.log('End.'))
})

req.on('error', console.log)
req.write('Hello!')

// Doesn't close
req.end()

```
