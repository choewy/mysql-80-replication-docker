import { HttpStatus, INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerDocument } from './swagger.document';
import { NextFunction, Request, Response } from 'express';

export class Swagger extends SwaggerModule {
  public static readonly PATH = 'swagger';

  public static useOf(app: INestApplication, version: string) {
    super.setup(this.PATH, app, super.createDocument(app, SwaggerDocument.of('SWAGGER', version)));

    return (req: Request, res: Response, next: NextFunction) => {
      if (['/', '/api-docs'].includes(req.path)) {
        return res.redirect(HttpStatus.PERMANENT_REDIRECT, this.PATH);
      }

      next();
    };
  }
}
