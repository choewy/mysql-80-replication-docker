import { Controller, Get, Post } from '@nestjs/common';
import { VersionService } from './version.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('버전')
@Controller('versions')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  async getLatestVersion(): Promise<string> {
    return this.versionService.getLatestVersion();
  }

  @Post()
  async createNewVersion(): Promise<void> {
    return this.versionService.createNewVersion();
  }
}
