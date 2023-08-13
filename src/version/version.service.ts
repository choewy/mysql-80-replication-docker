import { VersionRepository } from '@database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  constructor(private readonly versionRepository: VersionRepository) {}

  async getLatestVersion(): Promise<string> {
    const id = await this.versionRepository.findLatestId();
    const str = id.toString();
    const suffixs: string[] = [];

    switch (str.length) {
      case 1:
        suffixs.push('0', '0', str);
        break;

      case 2:
        suffixs.push('0', str[0], str[1]);
        break;

      default:
        suffixs.push(str.slice(0, str.length - 2), str.charAt(str.length - 2), str.charAt(str.length - 1));
    }

    return 'v' + suffixs.join('.');
  }

  async createNewVersion(): Promise<void> {
    await this.versionRepository.insert(this.versionRepository.create());
  }
}
