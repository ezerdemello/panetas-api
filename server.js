const WebServer = require('./webserver')
const planetaRoute = require('./planetas-route')

const init = async () => {
    // console.log('planetasController: ', planetasController.listar)
    new WebServer(process.env.SERVER_PORT, { routeList: [
        planetaRoute()
    ]}).init()
}

init()



