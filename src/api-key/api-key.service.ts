import { Injectable } from '@nestjs/common';

import { ApiKey, ApiKeyPlatform, ApiKeyRepository } from '@database';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  async hasByName(platform: ApiKeyPlatform, name: string): Promise<boolean> {
    return this.apiKeyRepository
      .findOne({
        select: ['id'],
        where: { platform, name },
      })
      .then((r) => !!r);
  }

  async getApiKeys(name?: string, platform?: ApiKeyPlatform): Promise<ApiKey[]> {
    return this.apiKeyRepository.findBy({ name, platform });
  }

  async registApiKey(apiKey: ApiKey): Promise<void> {
    await this.apiKeyRepository.insert(apiKey);
  }
}
