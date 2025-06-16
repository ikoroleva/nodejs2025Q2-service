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

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  artists: string[];

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  albums: string[];

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  tracks: string[];

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
