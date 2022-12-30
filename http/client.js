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