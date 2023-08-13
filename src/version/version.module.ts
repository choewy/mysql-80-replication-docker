import { Module } from '@nestjs/common';
import { DatabaseModuleRef } from '@database';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';

@Module({
  imports: [DatabaseModuleRef],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
