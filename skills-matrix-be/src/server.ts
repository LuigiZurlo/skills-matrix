import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import api from './api';

class SkillsMatrixBackend {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private setRoutes(): void {
    this.express.use('/v1', api);
  }

}

export default new SkillsMatrixBackend().express;
