const _ = require('lodash');
const GenericError = require('./utils/generic-error')
const PlanetExternalService = require('./services/planetas-external-service')
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1');

const PlanetaRepository = class PlanetaRepository {
    
    constructor() {

        this.Planeta = mongoose.model(
            'Planeta', 
            new mongoose.Schema({
                     nome: {type: String, required: true},
                     clima: {type: String, required: true},
                     terreno: {type: String, required: true},
                     qtdAparicoesFilmes: {type: Number }
                    },{collection: 'Planeta'})
            );  
    }

    async update(model) {
        const item = await this.Planeta.findById(model.id)
        item.nome = model.nome
        item.clima = model.clima
        item.terreno = model.terreno
        item.qtdAparicoesFilmes = model.qtdAparicoesFilmes
        await item.save()
    }

    async create(model) {
        try {
            const modelToDb = new this.Planeta(model)    
            modelToDb.save();
        } catch (error) {
            throw new GenericError()
        } 
    }

    async delete(id) {
        this.Planeta.findOneAndDelete({_id: id}).exec()
    }

    async get(model = {}) {
        const filters = {}
        
        if (_.has(model, 'nome')) {
            filters.nome = model.nome
        }
        
        const resultDb = await this.Planeta.find(filters) 
        const result = []
        
        resultDb.map((object) => {
            result.push(this.factoryPlanetaFromDb(object))
        })

        return result
    }

    async find(id) {
        const result = await this.Planeta.findById(id)
        return result ? this.factoryPlanetaFromDb(result) : result
    }

    factoryPlanetaFromDb(itemDb) {
        const { _id, nome, clima, terreno, qtdAparicoesFilmes } = itemDb
        return { id: _id, nome, clima, terreno, qtdAparicoesFilmes }
    }
}

module.exports = PlanetaRepository