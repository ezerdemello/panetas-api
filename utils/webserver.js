const http = require('http')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const errorHandler = require('./webserver-error-handler')

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

        this.finalPlugins = [
          [errorHandler],
        ]

        this.port = port
        this.app = express()
        this.httpServer = http.createServer(this.app)
        this.configure(this.app, options)

    }

    configure (app, options) {
      const { initialPluginList, routeList, finalPluginList } = options
  
      if (initialPluginList && initialPluginList.length > 0) {
        this.plugins = [...this.plugins, ...initialPluginList]
      }
  
      for (const plugin in this.plugins) {
        app.use(...this.plugins[plugin])
      }

      if (routeList && routeList.length > 0) {
        routeList.map((routeObj) => {
          app.use(routeObj.prefix, this.mountRoutes(routeObj.routes))
        })
      }
  
      app.set('trust proxy', 1)
  
      app.get('/health', (req, res) => {
        res.end(`OK for ${process.uptime()} seconds`)
      })
  
      if (finalPluginList && finalPluginList.length > 0) {
        this.finalPlugins = [...this.finalPlugins, ...finalPluginList]
      }

      for (const plugin in this.finalPlugins) {
        app.use(...this.finalPlugins[plugin])
      }
    }

    mountRoutes (routes) {
      const router = express.Router()
  
      Object.keys(routes).map((key) => {
        routes[key].map((route) => {
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





