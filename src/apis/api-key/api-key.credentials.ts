import { ApiKey } from '@database/entities';

export class ApiBaseCredentials {
  readonly clientId: string = '';
  readonly clientSecret: string = '';

  public static of(e?: ApiKey) {
    return new ApiBaseCredentials(e);
  }

  constructor(e?: ApiKey) {
    if (e) {
      this.clientId = e.clientId;
      this.clientSecret = e.clientSecret;
    }
  }
}
