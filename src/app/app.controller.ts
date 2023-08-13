import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('앱')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
