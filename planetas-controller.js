// Load the full build.
const _ = require('lodash');

const result = [
    { id: '1', nome: 'test1', clima: 'test1', terreno: 'test1' },
    { id: '2', nome: 'test2', clima: 'test2', terreno: 'test2' },
    { id: '3', nome: 'test3', clima: 'test3', terreno: 'test3' },
    { id: '4', nome: 'test4', clima: 'test4', terreno: 'test4' },
]

module.exports = () => {
    
    const listar = async (req, res, next) => {
        try {
            return res.json(result)
        } catch (error) {
            next(error)
        }
    }

    const obterPorId = async (req, res, next) => {
        try {
            const planeta = _.find(result, {id: req.params.id})
            if (!planeta)
                throw new Error('nenhum objeto encontrado')
            return res.json(planeta)
        } catch (error) {
            next(error)
        }
    }

    return {
        listar,
        obterPorId
    }
}