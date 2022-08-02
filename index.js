

import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './src/config/db.js';
import veterinarioRouter from './src/routers/veternarioRouter.js';

const port = process.env.PORT || 4000
class Index {

  constructor() {

    this.server = express();
    this.middlewares();
    this.routes();
    this.servidor();
    dotenv.config();
    conectarDB();
    
  }

  servidor(){
    this.server.listen(port,() => console.log(`servidor funcionando en puerto: ${port}`))
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api/veterinario',veterinarioRouter);
  }
}

export default new Index().server;
