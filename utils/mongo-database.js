const GenericError = require('./generic-error')
const mongoose = require('mongoose');  

class MongoDatabase {

    constructor() {
      
      this._connect()
      
      // .then(data => {
      //   console.log("@@Conexao com mongodb OK!");                
      // }).catch(error => {
      //   console.log('@@@@Conexao com mongodb: ', error)
      // })

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