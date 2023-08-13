import { LogLevel } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { Injectable } from '@nestjs/common';

import { ProcessEnvValue } from './helpers';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

class TypeOrmSecretValue {
  private readonly env = ProcessEnvValue.of('TYPEORM');

  protected readonly TYPE = this.env.get('TYPE') as any;
  protected readonly HOST = this.env.get('HOST');
  protected readonly PORT = this.env.get('PORT');
  protected readonly USERNAME = this.env.get('USERNAME');
  protected readonly PASSWORD = this.env.get('PASSWORD');
  protected readonly DATABASE = this.env.get('DATABASE');
  protected readonly TIMEZONE = this.env.get('TIMEZONE');
  protected readonly LOGGING = ['error', 'warn', 'migration'] as LogLevel[];
  protected readonly ENTITIES = ['dist/database/entities/**/*.entity.js'];
  protected readonly MIGRAIONS = ['dist/database/migrations/**/*.js'];
  protected readonly MIGRATION_TABLE = 'migrations';
  protected readonly NAMING_STRATEGY = new SnakeNamingStrategy();
  protected readonly AUTO_LOAD_ENTITIES = true;
  protected readonly SYNCHRONIZE = true;
}

@Injectable()
export class TypeOrmSecret extends TypeOrmSecretValue {
  public get options(): TypeOrmModuleOptions {
    return {
      type: this.TYPE,
      host: this.HOST,
      port: Number(this.PORT),
      username: this.USERNAME,
      password: this.PASSWORD,
      database: this.DATABASE,
      timezone: this.TIMEZONE,
      logging: this.LOGGING,
      entities: this.ENTITIES,
      migrations: this.MIGRAIONS,
      migrationsTableName: this.MIGRATION_TABLE,
      namingStrategy: this.NAMING_STRATEGY,
      autoLoadEntities: this.AUTO_LOAD_ENTITIES,
      synchronize: this.SYNCHRONIZE,
    };
  }
}
