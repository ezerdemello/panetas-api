const _ = require('lodash');
const GenericError = require('./utils/generic-error')
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1');

const PlanetaRepository = class PlanetaRepository {
    
    constructor() {

        this.Planeta = mongoose.model('Planeta', 
            new mongoose.Schema({
                     nome: {type: String, required: true},
                     clima: {type: String, required: true},
                     terreno: {type: String, required: true},
                     aparicoes: Number }, 
                     {collection: 'Planeta'}
            )
        );  
        
        this.db = [
            { id: '1', nome: 'test1', clima: 'test1', terreno: 'test1' },
            { id: '2', nome: 'test2', clima: 'test2', terreno: 'test2' },
            { id: '3', nome: 'test3', clima: 'test3', terreno: 'test3' },
            { id: '4', nome: 'test4', clima: 'test4', terreno: 'test4' },
        ] 

    }

    async update(model) {
        console.log('update entrou: ', model)
        const item = await this.Planeta.findById(model.id)
        item.nome = model.nome
        item.clima = model.clima
        item.terreno = model.terreno
        await item.save()
    }

    async create(model) {
        try {
            const modelToDb = new this.Planeta({ ...model })    
            await modelToDb.save();
        } catch (error) {
            console.log(error)
            throw new GenericError()
        } 
    }

    async delete(id) {
        
        console.log('entrou-delete');
        _.remove(this.db, {id: model.id})
    }

    async get(model = {}) {
        const filters = {}
        
        if (_.has(model, 'nome')) {
            filters.nome = model.nome
        }
        
        const resultDb = await this.Planeta.find(filters) 
        const result = []
        
        resultDb.map((item) => {
            result.push(this.mountItem(item))
        })

        return result
    }

    async find(id) {
        const result = await this.Planeta.findById(id)
        return result ? this.mountItem(result) : result
    }

    mountItem(itemDb) {
        const { _id, nome, clima, terreno } = itemDb
        return { id: _id, nome, clima, terreno }
    }

}

module.exports = PlanetaRepository