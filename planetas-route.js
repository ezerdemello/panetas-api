
const joi = require('joi')
const planetasGetQueries = joi.object().keys({ nome: joi.string() })
const planetaGetPorIdParams = joi.object().keys({ id: joi.string() })
const planetasPostBody = joi.object().keys({ nome: joi.string().required(), clima: joi.string().required(), terreno: joi.string().required() })
const planetasPutBody = joi.object().keys({ nome: joi.string().required(), clima: joi.string().required(), terreno: joi.string().required(), qtdFilmes: joi.number() })
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
                expressValidator.body(planetasPostBody),
                planetasController.criar
            ]
          }
        ],
        put: [
          {
            path: '/planetas/:id',
            handlers: [
                expressValidator.params(planetaGetPorIdParams),
                expressValidator.body(planetasPutBody),
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

  