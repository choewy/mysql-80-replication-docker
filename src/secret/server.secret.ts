import { Injectable } from '@nestjs/common';
import { ProcessEnvValue } from './helpers';

class ServerSecretValue {
  private readonly env = ProcessEnvValue.of('SERVER');

  protected readonly HOST = this.env.get('HOST');
  protected readonly PORT = this.env.get('PORT');
}

@Injectable()
export class ServerSecret extends ServerSecretValue {
  public getListenOptions(): [number, string] {
    return [Number(this.PORT), this.HOST];
  }
}
