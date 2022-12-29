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
