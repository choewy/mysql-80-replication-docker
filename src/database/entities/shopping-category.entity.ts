import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ShoppingPlatform } from './enums';

@Entity()
export class ShoppingCategory {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 30 })
  platform: ShoppingPlatform;

  @Column({ type: 'varchar', length: 10, nullable: true })
  partentId: string | null;

  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'tinyint' })
  depth: number;

  @Column({ type: 'tinyint', nullable: true })
  order: number | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  mobileLink: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  pcLink: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  img1: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  img2: string | null;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  img3: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date | null;
}
