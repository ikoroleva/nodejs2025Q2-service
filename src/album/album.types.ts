import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

export interface Album {
  id: string;
  name: string;
  year: number;
  artist: Artist;
  tracks: Track[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAlbumDto {
  name: string;
  year: number;
  artist?: Artist;
}

export interface UpdateAlbumDto {
  name?: string;
  year?: number;
  artist?: Artist;
}

export type AlbumResponse = Omit<Album, 'tracks'>;
