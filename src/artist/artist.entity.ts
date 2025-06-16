import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ValueTransformer,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

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
