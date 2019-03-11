const _ = require('lodash');

const PlanetaRepository = class PlanetaRepository {
    constructor() {
        this.db = [
            { id: '1', nome: 'test1', clima: 'test1', terreno: 'test1' },
            { id: '2', nome: 'test2', clima: 'test2', terreno: 'test2' },
            { id: '3', nome: 'test3', clima: 'test3', terreno: 'test3' },
            { id: '4', nome: 'test4', clima: 'test4', terreno: 'test4' },
        ] 
    }

    async save(model) {
        const item = _.find(this.db, {id: model.id})
        if (!item) {
            this.db.push(model)
            return
        }
        // console.log('before this.db: ', this.db)
        _.remove(this.db, {id: model.id})
        this.db.push(model)
        // console.log('after this.db: ', this.db)
    }

    async get() {
        return this.db
    }

    async find(id) {
        // console.log('PlanetaRepository find')
        return _.find(this.db, {id: id})
    }
}

module.exports = PlanetaRepository