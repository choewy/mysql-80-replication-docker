import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Street11ApiService } from './street11-api.service';

@ApiTags('11st API')
@Controller('11st')
export class Street11ApiController {
  constructor(private readonly street11ApiService: Street11ApiService) {}

  @Post('shopping-categories/sync')
  async syncShoppingCategories(): Promise<boolean> {
    await this.street11ApiService.saveShoppingCategories();

    return true;
  }
}
