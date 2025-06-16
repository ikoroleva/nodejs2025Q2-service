import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ValueTransformer,
} from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
};

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Album, (album) => album.tracks)
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artist: Artist;

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
