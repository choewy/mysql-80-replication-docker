import { Module } from '@nestjs/common';

import { CoreModuleRef } from '@core';
import { DatabaseModuleRef } from '@database';
import { ApisModuleRef } from '@apis/apis.refs';

import { CoupangApiService } from './coupang-api.service';
import { CoupangApiController } from './coupang-api.controller';

@Module({
  imports: [CoreModuleRef.HttpModule, DatabaseModuleRef.DatabaseModule, ApisModuleRef.ApiKeyModule],
  controllers: [CoupangApiController],
  providers: [CoupangApiService],
  exports: [CoupangApiService],
})
export class CoupangApiModule {}
