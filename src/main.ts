import { NestFactory } from '@nestjs/core';
import { CoreModule } from '@submodule/core';
import { User } from '@submodule/entity';

async function bootstrap() {
  await NestFactory.createApplicationContext(CoreModule);

  console.log(new User());
}
bootstrap();
