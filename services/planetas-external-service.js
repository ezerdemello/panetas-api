
const axios = require('axios')
const PlanetsExternalService = class PlanetsExternalService {
    
    constructor() {

        this.client = axios.create({
            baseURL: 'https://swapi.co/api/',
        })
    }

    async get() {
        try {
            const result = await this.client.get('planets')
            return result.data.results
        } catch (error) {
            console.log(error)
            throw error
        }
    } 

}

module.exports = PlanetsExternalService