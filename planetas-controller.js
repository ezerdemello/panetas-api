// Load the full build.
const _ = require('lodash');
const NotFoundError = require('./utils/not-found-error')
const PlanetaRepository = require('./planetas-repository')
const uuidv1 = require('uuid/v1');
const repository = new PlanetaRepository()

module.exports = () => {
    
    const alterar = async (req, res, next) => {
        try {
            const model = { id: req.params.id, ...req.body }
            await repository.update(model)
            return res.json({mensagem: 'alterado com sucesso!'})
        } catch (error) {
            next(error)
        }    
    }
    
    const criar = async (req, res, next) => {
        try {
            await repository.create(req.body)
            return res.json({ mensagem: 'criado com sucesso!' })
        } catch (error) {
            next(error)
        }    
    }

    const deletar = async (req, res, next) => {
        try {
            await repository.delete(req.params.id)
            return res.json({ mensagem: 'deletado com sucesso!' })
        } catch (error) {
            next(error)
        }    
    }
    
    const listar = async (req, res, next) => {
        try {

            console.log('req.query: ', req.query)

            return res.json(await repository.get(req.query))
        } catch (error) {
            next(error)
        }
    }

    const obterPorId = async (req, res, next) => {
        try {
            const planeta = await repository.find(req.params.id) 
            if (!planeta)
                throw new NotFoundError('nenhum objeto encontrado')
            return res.json(planeta)
        } catch (error) {
            next(error)
        }
    }

    return {
        alterar,
        criar,
        deletar,
        listar,
        obterPorId
    }
}