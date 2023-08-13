import { forwardRef } from '@nestjs/common';

import { ApiKeyModule } from './api-key';
import { NaverApiModule } from './naver-api';

export class ApisModuleRef {
  public static readonly ApiKeyModule = forwardRef(() => ApiKeyModule);
  public static readonly NaverApiModule = forwardRef(() => NaverApiModule);
}
