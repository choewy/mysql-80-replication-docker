import { Module } from '@nestjs/common';

import { ApiKeyModule } from './api-key';
import { NaverApiModule } from './naver-api';
import { CoupangApiModule } from './coupang-api';
import { Street11ApiModule } from './street11-api';

@Module({
  imports: [ApiKeyModule, NaverApiModule, CoupangApiModule, Street11ApiModule],
  exports: [ApiKeyModule, NaverApiModule, CoupangApiModule, Street11ApiModule],
})
export class ApisModule {}
