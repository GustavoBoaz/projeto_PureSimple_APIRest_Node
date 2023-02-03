const http = require('http')
const UserController = require('./controllers/UserController')

const port = 3007

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    return UserController.postReq(req, res)
  } else if (req.method === 'GET') {
    return UserController.getReq(req, res)
  } else if (req.method === 'PUT') {
    return UserController.putReq(req, res)
  } else if (req.method === 'DELETE') {
    return UserController.deleteReq(req, res)
  }
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});