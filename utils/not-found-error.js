const status = require('http-status')
const GenericError = require('./generic-error')

const defaultMessage = 'Resource not found'
class NotFoundError extends GenericError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, NotFoundError)
    this.statusCode = status.NOT_FOUND
    this.message = message || defaultMessage
  }
}

module.exports = NotFoundError
