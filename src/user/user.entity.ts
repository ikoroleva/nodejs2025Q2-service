import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ValueTransformer,
} from 'typeorm';

const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({
    type: 'bigint',
    default: () => 'EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000',
    transformer: bigintTransformer,
  })
  createdAt: number;

  @Column({
    type: 'bigint',
    default: () => 'EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000',
    transformer: bigintTransformer,
  })
  updatedAt: number;
}
