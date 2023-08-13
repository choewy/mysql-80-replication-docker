import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoreModule } from '@core';
import { DatabaseModule } from '@database';
import { SecretModule } from '@secret';
import { VersionModule } from '@version';
import { ApisModule } from '@apis';

@Module({
  imports: [CoreModule, DatabaseModule, SecretModule, VersionModule, ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
