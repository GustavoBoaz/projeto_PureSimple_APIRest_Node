const qs = require('querystring')
const url = require('url')
const UserService = require('../services/UserService');
const UserHandler = require('../handlers/UserHandler');

function postReq(req, res) {
  const { pathname } = url.parse(req.url)
  if (pathname !== '/user') {
    return UserHandler.handleError(res, 404)
  }
  
  let body = ''
  req
    .on('data', (chunk) => {
      body += chunk.toString();
    })
    .on('end', () => {
      const data = JSON.parse(body)
      
      UserService.saveUser(data)
      console.log('User Posted: ', data)
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end('You Posted: ' + JSON.stringify(data))
    })
}

function getReq(req, res) {
  const { pathname } = url.parse(req.url)
  if (pathname !== '/users') {
    return UserHandler.handleError(res, 404)
  }
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  return res.end(JSON.stringify(UserService.getUsers()))
}

function putReq(req, res) {
  const { pathname, query } = url.parse(req.url)
  const { id } = qs.parse(query)
  if (pathname !== '/user') {
    return UserHandler.handleError(res, 404)
  }
  
  let body = ''
  req
    .on('data', (chunk) => {
      body += chunk.toString();
    })
    .on('end', () => {
      const data = JSON.parse(body)

      const userUpdated = UserService.replaceUser(id, data);
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(`{"userUpdated": ${userUpdated}}`)
    })
}

function deleteReq(req, res) {
  const { pathname, query } = url.parse(req.url)
  if (pathname !== '/user') {
    return UserHandler.handleError(res, 404)
  }
  const { id } = qs.parse(query)
  const userDeleted = UserService.deleteUser(id);
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.end(`{"userDeleted": ${userDeleted}}`)
}

const UserController = function() {}

UserController.prototype.postReq = postReq
UserController.prototype.getReq = getReq
UserController.prototype.putReq = putReq
UserController.prototype.deleteReq = deleteReq

module.exports = new UserController()