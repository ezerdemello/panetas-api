const status = require('http-status')
const defaultMessage = 'An unexpected error has occurred'

class GenericError extends Error {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, GenericError)
    this.statusCode = status.INTERNAL_SERVER_ERROR
    this.message = message || defaultMessage
  }
}

module.exports = GenericError
