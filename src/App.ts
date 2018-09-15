import * as express from 'express'
import  { config } from 'dotenv'

class App {

  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
    config();

  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
