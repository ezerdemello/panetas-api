const status = require('http-status')
const _ = require('lodash')

module.exports = (err, req, res, next) => {

  function handler (status) {
    res.status(status).send(err.message)
    res.end()
  }

  if (!_.isEmpty(err.error) && err.error.isJoi) {
    res.status(400).send(err.error.details[0].message)
    res.end()
  } else {
    // handler(err.statusCode || status.INTERNAL_SERVER_ERROR)
    res.status(500).send('foda-seeee')
    res.end()
  }
  //   handler(err.statusCode || status.INTERNAL_SERVER_ERROR)
}