const WebServer = require('./webserver')

const init = async () => {
    new WebServer(process.env.SERVER_PORT, {}).init()
}

init()