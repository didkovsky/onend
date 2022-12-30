## HTTP issue 1

This issue is a consequence of <a href="https://github.com/didkovsky/onend/tree/main/tcp/README.md">TCP issue</a>. If we have not listener .on('data') on a req object, the 'end' signal from the clients side will be ignored.

Server <a href="https://github.com/didkovsky/onend/tree/main/http/server.js">source</a>
``` javascript
const { createServer } = require('http')

createServer((req, res) => {
  console.log('Request.')
  req.on('error', console.log)

  // Not emitted
  req.on('end', () => console.log('End.'))

  /**
   * If listener .on('data') not defined,
   * req will ignore 'end' signal from client
   */
  // req.on('data', () => {})

  const dataInt = setInterval(() => {
    res.write('Data.')
  }, 1000)

  setTimeout(() => { 
    // clearInterval(dataInt)
    // res.end('Ok.')
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

  // Data will come while server sends it.
  response.on('data', data => console.log(data.toString('utf8')))
  // Not emitted, if .on('data') not attached on the server side
  response.on('end', () => console.log('End.'))
})

req.on('error', console.log)
req.write('Hello!')

// Will be ignored
req.end()

```
