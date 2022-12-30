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