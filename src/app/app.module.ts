import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from '@core';
import { DatabaseModule } from '@database';
import { SecretModule } from '@secret';
import { ApiKeyModule } from '@api-key';
import { VersionModule } from '@version';

@Module({
  imports: [CoreModule, DatabaseModule, SecretModule, VersionModule, ApiKeyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
