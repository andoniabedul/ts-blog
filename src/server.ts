////////////////// DEPENDENCIES //////////////////
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

////////////////// ROUTES //////////////////
import IndexRoutes from './routes/index.routes';
import PostsRoutes from './routes/posts.routes';

class Server {
  public app: express.Application;
  private VERSION: string;
  constructor(){
    this.app = express();
    this.VERSION = 'v1';
    this.setConfig();
  }
  private setConfig(){
    this.app.set('port', process.env.PORT || 9000);
    this.setDB();
    this.setMiddlewares();
    this.setRoutes(this.VERSION);
  }
  private setDB(){
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/restapi';
    const MONGO_OPTIONS =  {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };
    mongoose.set('useFindAndModify', true);
    mongoose.connect(MONGO_URI, MONGO_OPTIONS).then( db => console.log(`DB ON ${MONGO_URI} IS CONNECTED`))
  }
  private setMiddlewares(){
    this.app.use('logger', morgan(process.env.ENVIRONMENT || 'DEV'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
  }
  private setRoutes(API_VERSION:string){
    const getApiResource = (prefix: string, version: string) => `/${prefix}/${version}`;
    this.app.use(IndexRoutes);
    this.app.use(getApiResource('api', API_VERSION), PostsRoutes);
  }
  start(){
    const PORT = this.app.get('PORT');
    this.app.listen(PORT, () =>  console.log(`Server on port ${PORT}`));
  }
}

const server = new Server();
server.start();


