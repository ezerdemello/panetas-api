
const axios = require('axios')
const PlanetsExternalService = class PlanetsExternalService {
    
    constructor() {

        this.client = axios.create({
            baseURL: 'https://swapi.co/api/',
        })
    }

    async get() {
        console.log('get begin')
        try {
            const result = await this.client.get('planets')
            console.log(result)
            return result.results
        } catch (error) {
            console.log(error)
            throw error
        }
    } 

}

module.exports = PlanetsExternalService