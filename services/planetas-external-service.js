
const axios = require('axios')
const PlanetsExternalService = class PlanetsExternalService {
    
    constructor() {

        this.client = axios.create({
            baseURL: 'https://swapi.co/api/',
        })
    }

    async get({ page }) {
        try {

            const filters = {}
            
            if(page)
                filters.page = page

            const result = await this.client.get('planets', { params: filters })

            return result.data

        } catch (error) {
            console.log(error)
            throw error
        }

    } 
}

module.exports = PlanetsExternalService