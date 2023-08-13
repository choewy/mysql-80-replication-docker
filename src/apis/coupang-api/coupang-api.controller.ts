import { Controller, Post } from '@nestjs/common';
import { CoupangApiService } from './coupang-api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Coupang API')
@Controller('coupang')
export class CoupangApiController {
  constructor(private readonly coupangApiService: CoupangApiService) {}

  @Post('shopping-categories/sync')
  async syncShoppingCategories(): Promise<boolean> {
    await this.coupangApiService.saveShoppingCategories();

    return true;
  }
}
