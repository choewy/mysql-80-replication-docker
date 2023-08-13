import { Version } from '@database/entities';

import { InjectableRepository } from './decorators';
import { IRepository } from './abstracts';

@InjectableRepository(Version)
export class VersionRepository extends IRepository<Version> {
  async findLatestId(): Promise<number> {
    const versions = await this.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    return versions[0]?.id || 0;
  }
}
