
const joi = require('joi')
const planetasGetQueries = joi.object().keys({ nome: joi.string() })
const planetaGetPorIdParams = joi.object().keys({ id: joi.string() })

const expressValidator = require('express-joi-validation')({ passError: true })
const planetasController = require('./planetas-controller')()

module.exports = () => {
    return {
      prefix: '/api/v1',
      routes: {
        get: [
          {
            path: '/planetas',
            handlers: [
                expressValidator.query(planetasGetQueries),
                planetasController.listar
            ]
          },
          {
            path: '/planetas/:id',
            handlers: [
                expressValidator.params(planetaGetPorIdParams),
                planetasController.obterPorId
            ]
          }
        ]
      }
    }
}

  