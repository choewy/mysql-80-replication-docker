import { plainToInstance } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { Method } from 'axios';
import { createHmac } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ApiKeyPlatform, ShoppingCategoryRepository } from '@database';
import { ApiBaseCredentials, ApiKeyService } from '@apis/api-key';
import { CoupangApiResponse, CoupangShoppingCategory } from './classes';

@Injectable()
export class CoupangApiService implements OnApplicationBootstrap {
  private credentials: ApiBaseCredentials;

  constructor(
    private readonly httpService: HttpService,
    private readonly apiKeyService: ApiKeyService,
    private readonly shoppingCategoryRepository: ShoppingCategoryRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.credentials = await this.apiKeyService.getApiBaseCredentials(ApiKeyPlatform.COUPANG);
  }

  private getDateTime(): string {
    return new Date().toISOString().substring(2, 18).replaceAll(':', '').replaceAll('-', '') + 'Z';
  }

  private createHmac(datetime: string, method: Method, path: string, query = ''): string {
    return createHmac('sha256', this.credentials.clientSecret)
      .update([datetime, method, path, query].join(''))
      .digest('hex');
  }

  private createAuthorization(datetime: string, signature: string): string {
    return [
      'CEA algorithm=HmacSHA256',
      `access-key=${this.credentials.clientId}`,
      `signed-date=${datetime}`,
      `signature=${signature}`,
    ].join(', ');
  }

  private async saveShoppingCategoriesRecursive(
    category: CoupangShoppingCategory,
    parentId: number,
    depth: number,
  ): Promise<void> {
    await this.shoppingCategoryRepository.upsert(category.toEntity(parentId, depth), {
      conflictPaths: { platform: true, id: true },
    });

    const branches = plainToInstance(CoupangShoppingCategory, category.child || []);
    const nextDepth = depth + 1;

    for (const branch of branches) {
      await this.saveShoppingCategoriesRecursive(branch, category.displayItemCategoryCode, nextDepth);
    }
  }

  async saveShoppingCategories(): Promise<void> {
    const response = await this.getShoppingCategories();
    const category = plainToInstance(CoupangShoppingCategory, response.data);

    await this.saveShoppingCategoriesRecursive(category, 0, 1);
  }

  async getShoppingCategories() {
    const url = 'https://api-gateway.coupang.com';
    const path = '/v2/providers/seller_api/apis/api/v1/marketplace/meta/display-categories';

    const datetime = this.getDateTime();
    const signature = this.createHmac(datetime, 'GET', path);
    const authorization = this.createAuthorization(datetime, signature);

    return lastValueFrom(
      this.httpService.get<CoupangApiResponse<CoupangShoppingCategory>>([url, path].join(''), {
        headers: { Authorization: authorization },
      }),
    ).then((res) => plainToInstance(CoupangApiResponse<CoupangShoppingCategory>, res.data));
  }
}
