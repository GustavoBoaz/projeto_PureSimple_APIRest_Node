const http = require('http')

function handleError(res, code) {
  res.statusCode = code
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`)
}

const UserHandler = function() {}

UserHandler.prototype.handleError = handleError

module.exports = new UserHandler()