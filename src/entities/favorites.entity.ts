import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { Track } from './track.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Artist, { nullable: true })
  artist: Artist;

  @ManyToOne(() => Album, { nullable: true })
  album: Album;

  @ManyToOne(() => Track, { nullable: true })
  track: Track;

  @CreateDateColumn()
  createdAt: Date;
} 