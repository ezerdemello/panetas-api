require('dotenv').config()

const WebServer = require('./utils/webserver')
const planetaRoute = require('./planetas-route')

const init = async () => {

    const db = require('./utils/mongo-database')
    
    const cache = require('./utils/redis-cache')
    
    cache.toHeatCache()


    new WebServer(process.env.SERVER_PORT, { routeList: [
        planetaRoute()
    ]}).init()

}

init()



