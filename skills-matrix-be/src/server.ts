import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';

import api from './api';

class SkillsMatrixBackend {

  public express: express.Application;
  public swaggerDoc = require('/Users/jaona/Local/code/skills-matrix/skills-matrix-be/src/swagger.json');

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
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDoc));
  }

}

export default new SkillsMatrixBackend().express;
