const PlanetaExternalService = require('../services/planetas-external-service')
const planetaExternalService = new PlanetaExternalService()
const redis = require('redis')

class RedisCache {

    constructor() {
        
        this.connect().then(data => {

            console.log("@@Conexao com redis OK!");                

        }).catch((err) => {

            console.log("@@Conexao com redis erro: ", error);                

        })

    }

    async connect () {

        this.client = redis.createClient({
            port      : process.env.CACHE_PORT,  
            host      : process.env.CACHE_HOST  
        });

    }

    fillItensInCache (itens = []) {

        let contatdor = 0

        for(let index in itens) {
            const item = itens[index];
            const valueCache = { name: item.name, qtdFilmes: (item.films ? item.films.length : 0) }
            console.log('valueCache: ', valueCache)
            this.client.set(item.name, JSON.stringify(valueCache))                    
            contatdor++
        }

        return contatdor
    }

    async toHeatCache (model) {

        let page = 1
        let qtdInCache = 0
        let total = 0            

        if (model) {
            page = model.page
            qtdInCache = model.qtdInCache
            total = model.total
        } 

        if (total == 0 || qtdInCache < total) {
            const data = await planetaExternalService.get({ page })
            total = data.count
            qtdInCache = qtdInCache + this.fillItensInCache(data.results)
            await this.toHeatCache({ page: page + 1, qtdInCache, total})
        }
        
        return 
    }

}

module.exports = new RedisCache()


