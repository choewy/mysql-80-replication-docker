import { xml2json } from 'xml-js';
import { decode } from 'iconv-lite';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ShoppingCategoryRepository, ApiKeyPlatform } from '@database';
import { ApiBaseCredentials, ApiKeyService } from '@apis/api-key';
import { AxiosResponse } from 'axios';
import { plainToInstance } from 'class-transformer';
import { Street11XMLShoppingCategoryResponse } from './classes';

@Injectable()
export class Street11ApiService implements OnApplicationBootstrap {
  private credentials: ApiBaseCredentials;

  constructor(
    private readonly httpService: HttpService,
    private readonly apiKeyService: ApiKeyService,
    private readonly shoppingCategoryRepository: ShoppingCategoryRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.credentials = await this.apiKeyService.getApiBaseCredentials(ApiKeyPlatform.STREET11);
  }

  private toJSON(res: AxiosResponse): object {
    return JSON.parse(
      xml2json(decode(res.data, 'EUC-KR'), {
        compact: true,
      }),
    );
  }

  async saveShoppingCategories(id?: string): Promise<void> {
    const categories = (await this.getShoppingCategories(id)).getCategories();

    for (const category of categories) {
      await this.shoppingCategoryRepository.upsert(category.toEntity(), {
        conflictPaths: { platform: true, id: true },
      });

      if (!category.leafYn || category.leafYn._text === 'N') {
        continue;
      }

      await this.saveShoppingCategories(category.dispNo._text);
    }
  }

  async getShoppingCategories(id?: string): Promise<Street11XMLShoppingCategoryResponse> {
    const url = 'https://api.11st.co.kr/rest/cateservice/category';
    return lastValueFrom(
      this.httpService.get<Street11XMLShoppingCategoryResponse>(id ? [url, id].join('/') : url, {
        responseType: 'arraybuffer',
      }),
    ).then((res) => plainToInstance(Street11XMLShoppingCategoryResponse, this.toJSON(res)));
  }
}
