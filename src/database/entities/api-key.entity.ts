import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ApiKeyPlatform } from './enums';

@Entity()
export class ApiKey {
  public static of(platform: ApiKeyPlatform, name: string, clientId: string, clientSecret?: string, expiredAt?: Date) {
    return new ApiKey(platform, name, clientId, clientSecret, expiredAt);
  }

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: 'PK',
  })
  public readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  public platform: ApiKeyPlatform;

  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @Column({ type: 'varchar', length: 512 })
  public clientId: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  public clientSecret: string;

  @Column({ type: 'datetime', nullable: true })
  public expiredAt: Date | null;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;

  constructor(platform: ApiKeyPlatform, name: string, clientId: string, clientSecret: string, expiredAt?: Date) {
    this.platform = platform;
    this.name = name;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.expiredAt = expiredAt;
  }
}
