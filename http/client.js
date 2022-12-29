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
