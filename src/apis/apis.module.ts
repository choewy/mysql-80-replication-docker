import { Module } from '@nestjs/common';

import { ApiKeyModule } from './api-key';
import { NaverApiModule } from './naver-api';
import { CoupangApiModule } from './coupang-api';

@Module({
  imports: [ApiKeyModule, NaverApiModule, CoupangApiModule],
  exports: [ApiKeyModule, NaverApiModule, CoupangApiModule],
})
export class ApisModule {}
