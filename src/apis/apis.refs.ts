import { forwardRef } from '@nestjs/common';

import { ApiKeyModule } from './api-key';

export class ApisModuleRef {
  public static readonly ApiKeyModule = forwardRef(() => ApiKeyModule);
}
