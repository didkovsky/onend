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

// Не завершаем запрос
// req.end()
