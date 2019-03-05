const http = require('http')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')

class WebServer {

    constructor(port = 3000, options = {}) {
        
        this.plugins = [
          [helmet()],
          [methodOverride()],
          [cookieParser()],
          [bodyParser.json()],
          [bodyParser.urlencoded({ extended: false })],
          [compression()],
          [cors()],
        ]        

        this.port = port
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.configure(this.app, options)

    }

    configure (app, options) {
        const { initialPluginList, routeList, finalPluginList } = options
    
        // if (initialPluginList && initialPluginList.length > 0) {
        //   this.plugins = [...this.plugins, ...initialPluginList]
        // }
    
        for (const plugin in this.plugins) {
          app.use(...this.plugins[plugin])
        }

        console.log('inclui plugins ...')
        
        if (routeList && routeList.length > 0) {
          console.log('montando rotas declaradas ...')

          routeList.map((routeObj) => {
            
            console.log('routeObj.prefix: ', routeObj.prefix)
            console.log('routeObj.routes: ', routeObj.routes)
            app.use(routeObj.prefix, this.mountRoutes(routeObj.routes))

          })

        }
    
        app.set('trust proxy', 1)
    
        app.get('/health', (req, res) => {
          res.end(`OK for ${process.uptime()} seconds`)
        })
    
        // if (finalPluginList && finalPluginList.length > 0) {
        //   finalPluginList.map((plugin) => {
        //     app.use(plugin)
        //   })
        // }
    }

    mountRoutes (routes) {
      const router = express.Router()
  
      Object.keys(routes).map((key) => {
        routes[key].map((route) => {
          console.log('montando rota: ', route.path)
          router[key.toLowerCase()](route.path, route.handlers)
        })
      })
      
      return router
    }

    init () {
        this.server = this.httpServer.listen(this.port)
        this.server.setTimeout(300000)
        console.log(`Web server listening on port ${this.port}`)
    }
    
    getServer () {
        return this.server
    }

}

module.exports = WebServer

// module.exports = 



