import { ObjectLiteral, Repository } from 'typeorm';
import { RepositoryProvider } from './providers';

export class IRepository<T extends ObjectLiteral> extends Repository<T> {
  public static get provider() {
    return RepositoryProvider(this);
  }
}
