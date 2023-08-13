import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ServerSecret } from './server.secret';
import { TypeOrmSecret } from './typeorm.secret';

const factories: Provider[] = [TypeOrmSecret, ServerSecret];

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: factories,
  exports: factories,
})
export class SecretModule {}
