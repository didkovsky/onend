## TCP issue

If a listener .on('data') on a server socket not defined, the 'end' signal from the clients side will be ignored.

Server <a href="https://github.com/didkovsky/onend/tree/main/tcp/server.js">source</a>
``` javascript
const { createServer } = require('net')

createServer(socket => {

  socket.on('error', console.log)
  
  // Not emitted
  socket.on('end', () => console.log('end.'))
  socket.on('close', () => console.log('close.'))

  /**
   * If listener .on('data') not defined,
   * socket will ignore 'end' signal from client
   */
  // socket.on('data', () => {})

  setTimeout(() => {
    // Missing end
    // socket.end()
  }, 2000)

  setInterval(() => {
    socket.write('Data.')
  }, 500)
})
.listen(444)

```

Client <a href="https://github.com/didkovsky/onend/tree/main/tcp/client.js">source</a>
``` javascript
const { Socket } = require('net')

const socket = new Socket()
socket.on('error', console.log)

// Not emitted, if .on('data') not attached on the server side
socket.on('end', () => console.log('End.'))

// Data will come while server sends it
socket.on('data', data => console.log(data.toString('utf8')))

socket.connect({
  host: 'localhost',
  port: 444
}, () => {
  socket.write('Hello!')
 // Will be ignored
  socket.end()
})

```
