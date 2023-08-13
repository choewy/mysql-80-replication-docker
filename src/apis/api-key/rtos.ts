import { ApiKey } from '@database';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class ApiKeyRto {
  @ApiResponseProperty()
  @Expose()
  readonly name: string;

  @ApiResponseProperty()
  @Expose()
  readonly clientId: string;

  @ApiResponseProperty()
  @Expose()
  readonly clientSecret: string;

  @ApiResponseProperty()
  @Expose()
  readonly expiredAt?: Date | null;

  public static of(e: ApiKey) {
    return plainToInstance(ApiKeyRto, e);
  }

  public static arrayOf(es: ApiKey[]) {
    return es.map(this.of);
  }
}
