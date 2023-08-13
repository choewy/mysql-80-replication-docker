import { HttpModule } from '@nestjs/axios';
import { forwardRef } from '@nestjs/common';
import { CoreModule } from './core.module';

export class CoreModuleRef {
  public static readonly CoreModule = forwardRef(() => CoreModule);
  public static readonly HttpModule = forwardRef(() => HttpModule);
}
