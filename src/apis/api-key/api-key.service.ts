import { Injectable } from '@nestjs/common';

import { ApiKey, ApiKeyPlatform, ApiKeyRepository } from '@database';
import { ApiBaseCredentials } from './api-key.credentials';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async hasByName(platform: ApiKeyPlatform, name: string): Promise<boolean> {
    return this.apiKeyRepository
      .findOne({
        select: ['id'],
        where: { platform, name, isActive: true },
      })
      .then((r) => !!r);
  }

  async getApiKeys(name?: string, platform?: ApiKeyPlatform): Promise<ApiKey[]> {
    return this.apiKeyRepository.findBy({ name, platform, isActive: true });
  }

  async registApiKey(apiKey: ApiKey): Promise<void> {
    await this.apiKeyRepository.insert(apiKey);
  }

  async getApiBaseCredentials(platform: ApiKeyPlatform): Promise<ApiBaseCredentials> {
    return this.apiKeyRepository.findOneBy({ platform, isActive: true }).then(ApiBaseCredentials.of);
  }
}
