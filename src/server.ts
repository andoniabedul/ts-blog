////////////////// DEPENDENCIES //////////////////
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import moongose from 'mongoose';

////////////////// ROUTES //////////////////
import IndexRoutes from './routes/index.routes';

class Server {
  public app: express.Application;

  constructor(){
    this.app = express();
    this.setConfig();
  }
  private setConfig(){
    this.app.set('port', process.env.PORT || 9000);
    this.setMiddlewares();
  }
  private setMiddlewares(){
    this.app.use('logger', morgan(process.env.ENVIRONMENT || 'DEV'));
    this.app.use(helmet());
  }
  private setRoutes(){
    this.app.use(IndexRoutes)
  }
  start(){
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port %s', this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();


