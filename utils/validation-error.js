const status = require('http-status')
const GenericError = require('./generic-error')

const defaultMessage = 'A validation rule has been breached'
class ValidationError extends GenericError {
  constructor (message) {
    super(message)
    Error.captureStackTrace(this, ValidationError)
    this.statusCode = status.BAD_REQUEST
    this.message = message || defaultMessage
  }
}

module.exports = ValidationError
