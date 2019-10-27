
const joi = require('joi')
const planetasGetQueries = joi.object().keys({ nome: joi.string() })
const planetaGetPorIdParams = joi.object().keys({ id: joi.string() })
const planetasPostPutBody = joi.object().keys({ nome: joi.string().required(), clima: joi.string().required(), terreno: joi.string().required() })
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
      ],
      post: [
        {
          path: '/planetas',
          handlers: [
            expressValidator.body(planetasPostPutBody),
            planetasController.criar
          ]
        }
      ],
      put: [
        {
          path: '/planetas/:id',
          handlers: [
            expressValidator.params(planetaGetPorIdParams),
            expressValidator.body(planetasPostPutBody),
            planetasController.alterar
          ]
        }
      ],
      delete: [
        {
          path: '/planetas/:id',
          handlers: [
            expressValidator.params(planetaGetPorIdParams),
            planetasController.deletar
          ]
        }
      ]
    }
  }
}

