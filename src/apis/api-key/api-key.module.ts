import { Module } from '@nestjs/common';

import { DatabaseModuleRef } from '@database';

import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';

@Module({
  imports: [DatabaseModuleRef.DatabaseModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
