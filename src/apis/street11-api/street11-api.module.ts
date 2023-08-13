import { Module } from '@nestjs/common';

import { CoreModuleRef } from '@core';
import { DatabaseModuleRef } from '@database';
import { ApisModuleRef } from '@apis/apis.refs';

import { Street11ApiController } from './street11-api.controller';
import { Street11ApiService } from './street11-api.service';

@Module({
  imports: [CoreModuleRef.HttpModule, DatabaseModuleRef.DatabaseModule, ApisModuleRef.ApiKeyModule],
  controllers: [Street11ApiController],
  providers: [Street11ApiService],
  exports: [Street11ApiService],
})
export class Street11ApiModule {}
