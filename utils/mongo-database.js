const GenericError = require('./generic-error')
const mongoose = require('mongoose');  

class MongoDatabase {

    constructor() {
      this._connect()
    }

  async _connect() {
        try {
            await mongoose.connect(`mongodb://${process.env.DB_URL}`, { useNewUrlParser: true })     
        } catch (error) {
            throw new GenericError()    
        }
    }
}

  module.exports = new MongoDatabase()