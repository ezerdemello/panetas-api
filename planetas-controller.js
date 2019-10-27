const _ = require('lodash');
const NotFoundError = require('./utils/not-found-error')

const PlanetaRepository = require('./planetas-repository')
const planetaRepository = new PlanetaRepository()

const redisCache = require('./utils/redis-cache')

// const PlanetaExternalService = require('./services/planetas-external-service')
// const planetaExternalService = new PlanetaExternalService()
// let planets = [] 


module.exports = () => {
    
    // planetaExternalService.get().then((data) => {
    //     planets = data
    // })
    
    const alterar = async (req, res, next) => {
        try {
            
            const model = { id: req.params.id, ...req.body }
            
            // addQtdAparicoeFilmes(model)  
            
            await planetaRepository.update(model)

            return res.json({mensagem: 'alterado com sucesso'})

        } catch (error) {
            next(error)
        }    
    }
    
    const criar = async (req, res, next) => {
        try {
            const model = { ...req.body }
            
            // addQtdAparicoeFilmes(model)  
            
            await planetaRepository.create(model)

            return res.json({ mensagem: 'criado com sucesso' })

        } catch (error) {
            console.log(error)
            next(error)
        }    
    }

    const deletar = async (req, res, next) => {
        try {
            await planetaRepository.delete(req.params.id)
            return res.json({ mensagem: 'removido com sucesso' })
        } catch (error) {
            next(error)
        }    
    }
    
    
    const listar = async (req, res, next) => {
        try {
            const result = []   
            const resultFromDb = await planetaRepository.get(req.query) 
            
            for(var index in resultFromDb) {
                const item = resultFromDb[index]                     
                item.qtdAparicoesFilmes = 0                    
                const cache = await redisCache.getByKey(item.nome)
                if (cache) {
                    const cacheModel = JSON.parse(cache)
                    item.qtdAparicoesFilmes = cacheModel.qtdFilmes
                }
                result.push(item)
            }

            return res.json(result)

        } catch (error) {
            next(error)
        }
    }

    const obterPorId = async (req, res, next) => {
        try {
            const planeta = await planetaRepository.find(req.params.id) 
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

