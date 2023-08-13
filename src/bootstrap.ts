import { json } from 'express';

import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { Swagger } from '@core';
import { ServerSecret } from '@secret';
import { VersionService } from '@version';

export class Bootstrap {
  public static async of(module: any) {
    const app = await NestFactory.create(module);

    const version = await app.get(VersionService).getLatestVersion();
    const reflector = app.get(Reflector);

    app.use(json());
    app.use(Swagger.useOf(app, version));

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(reflector, {
        excludeExtraneousValues: true,
      }),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        validateCustomDecorators: true,
      }),
    );

    return new Bootstrap(app, version);
  }

  constructor(readonly app: INestApplication, readonly version: string) {}

  async listen(): Promise<void> {
    return this.app.listen(...this.app.get(ServerSecret).getListenOptions());
  }
}
