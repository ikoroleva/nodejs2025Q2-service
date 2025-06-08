import { Artist } from '../artist/artist.entity';
import { Track } from '../track/track.entity';

export interface Album {
  id: string;
  name: string;
  year: number;
  artist: Artist;
  tracks: Track[];
  createdAt: number;
  updatedAt: number;
}

export interface CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export interface UpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: string | null;
}

export interface AlbumResponse {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  createdAt: number;
  updatedAt: number;
}
