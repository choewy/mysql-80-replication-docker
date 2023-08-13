import { forwardRef } from '@nestjs/common';
import { ApiKeyModule } from './api-key.module';

export class ApiKeyModuleRef {
  public static readonly ApiKeyModule = forwardRef(() => ApiKeyModule);
}
