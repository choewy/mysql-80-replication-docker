export class ProcessEnvValue {
  public static of(prefix: string) {
    return new ProcessEnvValue(prefix);
  }

  constructor(readonly prefix: string) {}

  public get(key: string): string {
    return process.env[[this.prefix, key].join('_')];
  }
}
