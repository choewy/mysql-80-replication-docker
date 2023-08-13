import { Module } from '@nestjs/common';

import { CoreModuleRef } from '@core';
import { DatabaseModuleRef } from '@database';

import { ApisModuleRef } from '../apis.refs';
import { NaverApiService } from './naver-api.service';
import { NaverApiController } from './naver-api.controller';

@Module({
  imports: [CoreModuleRef.HttpModule, DatabaseModuleRef.DatabaseModule, ApisModuleRef.ApiKeyModule],
  controllers: [NaverApiController],
  providers: [NaverApiService],
  exports: [NaverApiService],
})
export class NaverApiModule {}
