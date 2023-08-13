import { Module, Provider, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecretModule, TypeOrmSecret } from '@secret';
import { ApiKeyRepository, VersionRepository } from './repositories';

const repositories: Provider[] = [VersionRepository, ApiKeyRepository].map((r) => r.provider);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SecretModule],
      inject: [TypeOrmSecret],
      useFactory(secret: TypeOrmSecret) {
        return secret.options;
      },
    }),
  ],
  providers: repositories,
  exports: repositories,
})
export class DatabaseModule {}
export const DatabaseModuleRef = forwardRef(() => DatabaseModule);
