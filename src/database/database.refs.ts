import { forwardRef } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { ApiKeyRepository, VersionRepository } from './repositories';

export class DatabaseModuleRef {
  public static readonly DatabaseModule = forwardRef(() => DatabaseModule);
  public static readonly VersionRepository = forwardRef(() => VersionRepository);
  public static readonly ApiKeyRepository = forwardRef(() => ApiKeyRepository);
}
