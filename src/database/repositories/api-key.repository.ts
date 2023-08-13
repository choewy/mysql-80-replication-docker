import { ApiKey } from '@database/entities';

import { IRepository } from './abstracts';
import { InjectableRepository } from './decorators';

@InjectableRepository(ApiKey)
export class ApiKeyRepository extends IRepository<ApiKey> {}
