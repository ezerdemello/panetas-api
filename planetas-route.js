
const joi = require('joi')
const expressValidator = require('express-joi-validation')({})
const planetasGetQueryString = joi.object().keys({
    nome: joi.string()
})


const planetasController = require('./planetas-controller')()


module.exports = () => {
    return {
      prefix: '/api/v1',
      routes: {
        get: [
          {
            path: '/planetas',
            handlers: [
            //   expressValidator.query(recursoSchema.listar),
            planetasController.listar
            ]
          }
        ]
      }
    }
}

  