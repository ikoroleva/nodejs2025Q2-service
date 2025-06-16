import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
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
