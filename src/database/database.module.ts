import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecretModule, TypeOrmSecret } from '@secret';
import { ApiKeyRepository, ShoppingCategoryRepository, VersionRepository } from './repositories';

const repositories: Provider[] = [VersionRepository, ApiKeyRepository, ShoppingCategoryRepository].map(
  (r) => r.provider,
);

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
