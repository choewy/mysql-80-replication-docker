import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Version {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    comment: 'PK',
  })
  public readonly id: number;

  @CreateDateColumn()
  public readonly createdAt: Date;
}
