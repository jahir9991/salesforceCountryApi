import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as createError from 'http-errors';
import * as logger from 'morgan';
var exphbs = require('express-handlebars');

import { apiRoutes } from './routes';

class Server {
  // set app to be of type express.Application
  public app: express.Application;

  public router: any;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {
    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    // this.app.use(helmet());
    this.app.use(cors());

    this.app.engine('handlebars', exphbs());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', 'src/views');

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use(
      '/',
      (req, res, next) => {
        console.log(`a ${req.method} request in ... route.`);

        next();
      },
      apiRoutes
    );

    // this.app.use('/', (req, res, next) => {
    //   console.log(`a ${req.method} request in main route.`);

    //   next();
    // });

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    this.app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.status(404).json({
        success: false,
        error: 'not found',
        status: 404
      });
    });
  }
}

// export
export default new Server().app;
