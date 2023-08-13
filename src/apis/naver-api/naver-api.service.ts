import { plainToInstance } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ApiKeyPlatform, ShoppingCategoryRepository } from '@database';
import { ApiKeyService, ApiBaseCredentials } from '@apis/api-key';
import { NaverShoppingCategory } from './classes';

@Injectable()
export class NaverApiService implements OnApplicationBootstrap {
  private credentials: ApiBaseCredentials;

  constructor(
    private readonly httpService: HttpService,
    private readonly apiKeyService: ApiKeyService,
    private readonly shoppingCategoryRepository: ShoppingCategoryRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.credentials = await this.apiKeyService.getApiBaseCredentials(ApiKeyPlatform.NAVER);
  }

  async saveShoppingCategories(id = 'root'): Promise<void> {
    const categories = await this.getShoppingCategories(id);

    for (const category of categories) {
      await this.shoppingCategoryRepository.upsert(category.toEntity(id), {
        conflictPaths: { platform: true, id: true },
      });

      const branches = plainToInstance(NaverShoppingCategory, category.categories || []);

      for (const branch of branches) {
        await this.shoppingCategoryRepository.upsert(branch.toEntity(category.catId), {
          conflictPaths: { platform: true, id: true },
        });

        if (branch.isLeaf) {
          continue;
        }

        await this.saveShoppingCategories(branch.catId);
      }
    }
  }

  async getShoppingCategories(id: string) {
    const url = 'https://shopping.naver.com/api/modules/gnb/category';

    return lastValueFrom(
      this.httpService.get<NaverShoppingCategory[]>(url, {
        params: { id },
      }),
    ).then((res) => plainToInstance(NaverShoppingCategory, res.data));
  }
}
