import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import { ApiKeyByPlatformQueryDto, ApiKeyRegistBodyDto } from './dtos';
import { AlreadyRegisteredApiKeyNameException } from './exceptions';
import { ApiKeyRto } from './rtos';

@ApiTags('API KEY')
@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Get()
  async getApiKeys(@Query() query: ApiKeyByPlatformQueryDto): Promise<ApiKeyRto[]> {
    return ApiKeyRto.arrayOf(await this.apiKeyService.getApiKeys(query.platform));
  }

  @Post()
  async registApiKey(@Query() query: ApiKeyByPlatformQueryDto, @Body() body: ApiKeyRegistBodyDto): Promise<void> {
    if (await this.apiKeyService.hasByName(query.platform, body.clientId)) {
      throw new AlreadyRegisteredApiKeyNameException();
    }

    return this.apiKeyService.registApiKey(body.toEntity(query.platform));
  }
}
