const GenericError = require('./generic-error')
const mongoose = require('mongoose');  

class MongoDatabase {

    constructor() {
      this._connect()
    }

  async _connect() {
        try {
            await mongoose.connect(`mongodb://127.0.0.1:27017/planetas-api`, { useNewUrlParser: true })     
        } catch (error) {
            throw new GenericError()    
        }
    }
}

  module.exports = new MongoDatabase()