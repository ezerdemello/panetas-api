const _ = require('lodash');
const NotFoundError = require('./utils/not-found-error')

const PlanetaRepository = require('./planetas-repository')
const planetaRepository = new PlanetaRepository()
const PlanetaExternalService = require('./services/planetas-external-service')
const planetaExternalService = new PlanetaExternalService()
let planets = [] 


module.exports = () => {
    
    planetaExternalService.get().then((data) => {
        planets = data
    })
    
    const alterar = async (req, res, next) => {
        try {
            const model = { id: req.params.id, ...req.body }
            await planetaRepository.update(model)
            return res.json({mensagem: 'alterado com sucesso'})
        } catch (error) {
            next(error)
        }    
    }
    
    const criar = async (req, res, next) => {
        try {
            const model = { ...req.body, qtdAparicoesFilmes: 0 }
            const externalPlanet = _.find(planets, { name: req.body.nome })  
            
            if (externalPlanet) {
                
            }
                model.qtdAparicoesFilmes = _.get(object, 'externalPlanet.films', []).lenght 


            console.log('modelToDB: ', model)
            // await planetaRepository.create(model)

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
            return res.json(await planetaRepository.get(req.query))
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