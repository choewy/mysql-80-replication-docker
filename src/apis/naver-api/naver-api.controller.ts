import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NaverApiService } from './naver-api.service';

@ApiTags('Naver API')
@Controller('naver')
export class NaverApiController {
  constructor(private readonly naverApiService: NaverApiService) {}

  @Post('shopping-categories/sync')
  async syncShoppingCategories(): Promise<boolean> {
    await this.naverApiService.saveShoppingCategories();

    return true;
  }
}
